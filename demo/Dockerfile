# Self-contained WordPress image for the BlockBridge demo.
# Build context is the repo root so we can COPY from plugin/ and praser/demo/.
FROM wordpress:6.5-php8.2-apache

# Install wp-cli
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends less mariadb-client default-mysql-client; \
    rm -rf /var/lib/apt/lists/*; \
    curl -fsSL -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
    chmod +x /usr/local/bin/wp; \
    wp --info --allow-root

# Bake in the BlockBridge plugin source.
# Copy into BOTH /usr/src/wordpress (the upstream image's source-of-truth that
# its entrypoint untars into /var/www/html on first boot) AND /var/www/html
# (in case Docker's named-volume populate runs without the entrypoint pass).
COPY plugin/ /usr/src/wordpress/wp-content/plugins/blockbridge-wp/
COPY plugin/ /var/www/html/wp-content/plugins/blockbridge-wp/

# Seed script
COPY praser/demo/seed/import.sh /usr/local/bin/seed-wp.sh
RUN chmod +x /usr/local/bin/seed-wp.sh

# Custom entrypoint
COPY praser/demo/entrypoint.sh /usr/local/bin/blockbridge-entrypoint.sh
RUN chmod +x /usr/local/bin/blockbridge-entrypoint.sh

# Make sure the plugin and uploads paths exist with correct ownership
RUN set -eux; \
    mkdir -p /var/www/html/wp-content/uploads /usr/src/wordpress/wp-content/uploads; \
    chown -R www-data:www-data /var/www/html/wp-content /usr/src/wordpress/wp-content

ENTRYPOINT ["/usr/local/bin/blockbridge-entrypoint.sh"]
CMD ["apache2-foreground"]
