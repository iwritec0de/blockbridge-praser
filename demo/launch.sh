#!/bin/bash
# BlockBridge demo launcher — single command to bring everything up.
# 1. Build the praser library
# 2. Build + start the WordPress + DB containers
# 3. Wait for WP to be installed and serving REST content
# 4. Install Next.js demo site deps (if needed)
# 5. Start the Next.js dev server

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRASER_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
SITE_DIR="${SCRIPT_DIR}/site"

echo "==> Building praser library..."
cd "${PRASER_DIR}"
pnpm build

echo "==> Starting WordPress containers (build if needed)..."
cd "${SCRIPT_DIR}"
docker compose up -d --build db wordpress

echo "==> Waiting for WordPress to finish installing and seeding..."
WP_URL="http://localhost:8080"
tries=0
max_tries=90
until curl -fsS "${WP_URL}/wp-json/wp/v2/pages?slug=home" 2>/dev/null | grep -q '"serializedBlocks"'; do
  tries=$((tries + 1))
  if [ "${tries}" -ge "${max_tries}" ]; then
    echo ""
    echo "ERROR: WordPress did not become ready after $((max_tries * 2))s." >&2
    echo "Recent logs:" >&2
    docker compose logs --tail 50 wordpress >&2 || true
    exit 1
  fi
  printf "."
  sleep 2
done
echo ""
echo "==> WordPress is ready."

echo "==> Installing Next.js site dependencies..."
cd "${SITE_DIR}"
if [ ! -d node_modules ]; then
  pnpm install
else
  echo "    (node_modules exists, skipping install)"
fi

echo ""
echo "============================================================"
echo "  BlockBridge demo is up."
echo ""
echo "  Next.js:    http://localhost:3001"
echo "  WordPress:  http://localhost:8080"
echo "  WP admin:   http://localhost:8080/wp-admin  (admin / admin)"
echo ""
echo "  Stop with:  pnpm demo:down"
echo "============================================================"
echo ""

exec pnpm dev
