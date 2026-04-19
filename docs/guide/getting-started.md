# Getting Started

BlockBridge React renders WordPress Gutenberg blocks as React components. It works alongside the [BlockBridge WP plugin](https://github.com/iwritec0de/blockbridge-wp), which serializes blocks from the WordPress REST API into a format this library understands.

## Prerequisites

- Node.js 20+
- React 19 (required — the library targets the modern React renderer)
- A WordPress site with the BlockBridge WP plugin installed (only required when you're rendering real post content; the library itself works with any in-memory block tree)

## Installation

```bash
npm install @iwritec0de/blockbridge-react
# or
pnpm add @iwritec0de/blockbridge-react
# or
yarn add @iwritec0de/blockbridge-react
```

Import the included stylesheet in your app's entry point:

```js
import '@iwritec0de/blockbridge-react/style.css'
```

## Try it live

The fastest way to kick the tires is to fork a StackBlitz sandbox that feeds a mock `blocks` tree into `BlockContent` — no WordPress install required.

<div style="position:relative;padding-top:56.25%;margin:1.5rem 0;border-radius:8px;overflow:hidden;border:1px solid var(--vp-c-border);">
  <iframe
    src="https://stackblitz.com/fork/github/iwritec0de/blockbridge-react/tree/develop/demo?embed=1&file=README.md&hideNavigation=1&view=preview"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    title="BlockBridge React live sandbox"
    loading="lazy"
    allow="cross-origin-isolated"
  ></iframe>
</div>

::: tip Prefer to run locally?
The repo ships a complete Docker-based playground: `cd demo && docker compose up` spins up a seeded WordPress instance and a Next.js renderer on `http://localhost:3000`. See the [demo README](https://github.com/iwritec0de/blockbridge-react/blob/develop/demo/README.md) for details.
:::

## Next Steps

1. [Set up the WordPress plugin](./plugin-setup) — install and activate BlockBridge WP
2. [First render](./first-render) — fetch blocks from the REST API and render them
