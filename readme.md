[![CI](https://github.com/iwritec0de/blockbridge-react/actions/workflows/ci.yml/badge.svg)](https://github.com/iwritec0de/blockbridge-react/actions/workflows/ci.yml)

# @iwritec0de/blockbridge-react

Render WordPress Gutenberg blocks as React components.

Pairs with the [BlockBridge WP](https://github.com/iwritec0de/blockbridge-wp) plugin, which exposes a `serializedBlocks` field on the WordPress REST API. This library renders that payload as a React component tree.

## Install

```bash
pnpm add @iwritec0de/blockbridge-react
# or
npm i @iwritec0de/blockbridge-react
```

## Usage

```jsx
import { BlockContent } from '@iwritec0de/blockbridge-react';
import '@iwritec0de/blockbridge-react/style.css';

export default function Post({ post }) {
  return <BlockContent blocks={post.serializedBlocks} />;
}
```

`post.serializedBlocks` is the array returned by the BlockBridge WP plugin's REST field.

## Supported Blocks

| Block | Component | Notes |
|-------|-----------|-------|
| `core/paragraph` | `Paragraph` | |
| `core/heading` | `Heading` | Levels 1–6 |
| `core/image` | `Image` | Caption, link wrapping |
| `core/gallery` | `Gallery` | Grid layout, cropped images |
| `core/list` | `List` | Ordered and unordered |
| `core/list-item` | `ListItem` | Nested lists via children |
| `core/quote` | `Quote` | Citation support |
| `core/button` | `Button` | Colors, border radius, link targets |
| `core/buttons` | `Buttons` | Flex container for button groups |
| `core/group` | `Group` | Any `tagName`, colors |
| `core/columns` | `Columns` | Stacked on mobile |
| `core/column` | `Column` | Variable width |
| `core/cover` | `Cover` | Background image, overlay, parallax, focal point |
| `core/media-text` | `MediaText` | Side-by-side text + image/video |
| `core/audio` | `Audio` | Native `<audio>` with controls |
| `core/video` | `Video` | Native `<video>` with controls |
| `core/file` | `File` | Download button |
| `core/separator` | `Separator` | |
| `core/spacer` | `Spacer` | |
| `core/table` | `Table` | Head / body / foot |
| `core/embed` | `Embed` | YouTube, Vimeo (responsive iframe), Twitter (blockquote), generic |
| Any other block | `DefaultBlock` | Falls back to raw innerHTML |

## Custom serializers

Override how any block renders by passing `userSerializers`:

```jsx
const serializers = {
  'core/quote': ({ content, citation, children }) => (
    <blockquote className="my-quote">
      {children}
      {citation && <cite>{citation}</cite>}
    </blockquote>
  ),
};

<BlockContent blocks={blocks} userSerializers={serializers} />
```

The serializer receives the block's attributes spread as props, plus a `children` prop for blocks with nested inner blocks. The key is the Gutenberg block name (`core/quote`, `core/heading`, etc.).

## Theming

All visual styles are driven by CSS custom properties prefixed with `--bb-*`. Override them on any wrapper to retheme:

```css
.my-content {
  --bb-color-primary: #4f46e5;
  --bb-font-family: 'Inter', sans-serif;
  --bb-content-width: 720px;
}
```

See [`src/css/tokens.css`](./src/css/tokens.css) for the full token list. Key tokens:

| Token | Default | Description |
|-------|---------|-------------|
| `--bb-color-text` | `#191e23` | Body text color |
| `--bb-color-bg` | `#fff` | Background color |
| `--bb-color-primary` | `#0693e3` | Links, buttons |
| `--bb-font-family` | System sans-serif | Body font stack |
| `--bb-font-size-base` | `16px` | Base font size |
| `--bb-line-height` | `1.8` | Body line height |
| `--bb-content-width` | `610px` | Max content width |
| `--bb-block-margin` | `28px` | Vertical spacing between blocks |

## Demo

```bash
pnpm demo
```

Boots a Dockerized WordPress instance with seeded block content plus a Next.js demo site at http://localhost:3000.

```bash
pnpm demo:down   # Stop and remove containers + volumes
```

## Development

```bash
pnpm install     # Install dependencies
pnpm dev         # Start webpack dev server
pnpm build       # Build to lib/
pnpm test        # Run tests (Jest)
pnpm typecheck   # TypeScript check
pnpm lint        # ESLint
```

### Project structure

```
praser/
├── src/
│   ├── components/         # One directory per block type
│   ├── Utils/              # blocksToElements, getSerializers, cleanName
│   ├── css/
│   │   ├── tokens.css      # All CSS custom properties
│   │   ├── base.css        # Global resets + base styles
│   │   └── blocks/         # Per-block styles
│   └── index.ts            # Package entry — exports BlockContent + all components
├── lib/                    # Build output (not committed)
└── docs/                   # VitePress documentation site
```

## License

GPL-3.0-or-later
