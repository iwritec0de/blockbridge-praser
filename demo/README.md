# BlockBridge Demo

End-to-end demo: WordPress Gutenberg → BlockBridge WP plugin → REST API → `@iwritec0de/blockbridge-react`.

## Quick Start

```bash
cd demo
docker compose up
```

That's it. On first launch Docker will:

1. Start MariaDB and wait for it to be healthy
2. Boot WordPress, install it, activate the BlockBridge plugin, and seed demo content (~1200 lines of Gutenberg blocks, posts, pages, and menus)
3. Start the Next.js demo site once WordPress is serving content

| URL | What |
|---|---|
| http://localhost:3000 | Demo site (Next.js) |
| http://localhost:8080 | WordPress |
| http://localhost:8080/wp-admin | WP admin (`admin` / `admin`) |

First boot takes 1-3 minutes while WordPress installs and seeds. Subsequent starts are fast because the database volume persists.

## Stop

```bash
docker compose down      # stop containers, keep data
docker compose down -v   # stop containers AND delete all data (full reset)
```

Use `down -v` to wipe the database and WordPress volumes so the next `up` does a clean install and re-seed.

## Alternative: Local Dev (no Docker for Next.js)

If you prefer to run the Next.js site outside Docker (hot reload, debugger, etc.):

```bash
cd praser
pnpm demo          # uses launch.sh — builds lib, starts WP stack, then runs Next.js locally
pnpm demo:down     # tear down the WP stack
```

## Pages

| Path | What it shows |
|---|---|
| `/` | Home page rendered from `wp/v2/pages?slug=home` |
| `/blog`, `/post/[slug]` | Post list + single post via `BlockContent` |
| `/explore` | Block explorer with side-by-side rendered output and raw JSON |
| `/customize` | Live token customizer — edit `--bb-*` CSS variables and preview |

## Layout

```
demo/
├── Dockerfile           # Self-contained WP image (plugin + seed baked in)
├── Dockerfile.site      # Next.js demo site image
├── docker-compose.yml   # db + wordpress + site (all three services)
├── entrypoint.sh        # WP entrypoint: waits for db, installs, seeds, starts Apache
├── launch.sh            # `pnpm demo` — local dev orchestration (Next.js outside Docker)
├── seed/import.sh       # WP-CLI content seeder (~1190 lines)
└── site/                # Next.js demo app (Pages Router)
```

## Environment

| Variable | Used by | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_WP_URL` | site | `http://localhost:8080` | WordPress URL for browser-visible content |
| `WP_INTERNAL_URL` | site (server-side only) | — | Docker-internal WordPress URL for `getServerSideProps` fetches |

## Troubleshooting

**WordPress health check keeps failing:**
Check WP logs with `docker compose logs wordpress`. The seed script takes a minute or two on first boot.

**"Cannot connect to WordPress" from the Next.js site:**
The site waits for WordPress to be healthy before starting. If you see connection errors, WordPress may still be seeding. Give it another minute.

**Want a completely clean slate:**
```bash
docker compose down -v
docker compose up --build
```
