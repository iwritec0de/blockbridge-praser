#!/bin/bash
# BlockBridge demo entrypoint.
# 1. Run upstream WordPress entrypoint to set up wp-config and copy core files.
# 2. Wait for the database.
# 3. Install WordPress and seed demo content if needed (idempotent).
# 4. Hand off to apache2-foreground.

set -e

WP_PATH="/var/www/html"
WP="wp --allow-root --path=${WP_PATH}"

echo "[blockbridge] Running upstream WordPress entrypoint..."
# The upstream image's entrypoint copies WP core into /var/www/html and writes
# wp-config.php from env vars ONLY when $1 starts with "apache2" or equals
# "php-fpm". We pass "apache2 -v" so the setup runs and then the final exec
# just prints the Apache version and exits without starting the server — we
# start it ourselves below after seeding.
/usr/local/bin/docker-entrypoint.sh apache2 -v

# Re-bake the plugin in case the upstream entrypoint touched wp-content (it
# generally only writes wp-config and core files, but be defensive).
if [ ! -d "${WP_PATH}/wp-content/plugins/blockbridge-wp" ]; then
  echo "[blockbridge] Plugin missing after entrypoint; this should not happen."
fi

# Ensure uploads dir exists and is writable by www-data
mkdir -p "${WP_PATH}/wp-content/uploads"
chown -R www-data:www-data "${WP_PATH}/wp-content/uploads"
chmod -R 755 "${WP_PATH}/wp-content/uploads"

# Wait for the database to actually accept connections
echo "[blockbridge] Waiting for database at ${WORDPRESS_DB_HOST:-db}..."
DB_HOST="${WORDPRESS_DB_HOST:-db}"
DB_USER="${WORDPRESS_DB_USER:-wordpress}"
DB_PASS="${WORDPRESS_DB_PASSWORD:-wordpress}"
tries=0
until mysqladmin ping -h "${DB_HOST}" -u "${DB_USER}" -p"${DB_PASS}" --silent >/dev/null 2>&1; do
  tries=$((tries + 1))
  if [ "${tries}" -gt 60 ]; then
    echo "[blockbridge] Database did not become ready in time." >&2
    exit 1
  fi
  sleep 2
done
echo "[blockbridge] Database is up."

# Install + seed if needed
if ! $WP core is-installed 2>/dev/null; then
  echo "[blockbridge] WordPress not installed yet — running seed script."
  # The seed script handles install + content import.
  /usr/local/bin/seed-wp.sh
else
  echo "[blockbridge] WordPress already installed — skipping seed."
fi

# Always make sure plugin is active (idempotent)
if ! $WP plugin is-active blockbridge-wp 2>/dev/null; then
  echo "[blockbridge] Activating blockbridge-wp plugin..."
  $WP plugin activate blockbridge-wp || true
fi

# Ensure pretty permalinks are set (idempotent)
CURRENT_STRUCTURE=$($WP option get permalink_structure 2>/dev/null || echo "")
if [ "$CURRENT_STRUCTURE" != "/%postname%/" ]; then
  echo "[blockbridge] Setting permalink structure to /%postname%/..."
  $WP rewrite structure '/%postname%/'
  $WP rewrite flush
fi

# Final ownership pass
chown -R www-data:www-data "${WP_PATH}/wp-content"

echo "[blockbridge] Ready. Handing off to: $*"
exec "$@"
