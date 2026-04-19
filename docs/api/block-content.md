# BlockContent

The primary entry point. Accepts an array of serialized block objects from the WordPress REST API (via the BlockBridge WP plugin's `serializedBlocks` field) and renders them as React elements.

## Import

```ts
import { BlockContent } from '@iwritec0de/blockbridge-react'
import type { Block, SerializerMap } from '@iwritec0de/blockbridge-react'
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `blocks` | `Block[]` | ✓ | — | Array of serialized block objects from the `serializedBlocks` REST field |
| `userSerializers` | `SerializerMap` | — | `{}` | Map of block names to custom renderer components — merged with built-in renderers |
| `renderContainer` | `boolean` | — | `false` | When true, wraps all blocks in a container element |
| `className` | `string` | — | `'gbtr-container'` | Class name on the container (only used when `renderContainer` is true) |
| `wrapperComponent` | `ComponentType<{ className?: string; children?: ReactNode }>` | — | `<div>` | Custom container element (only used when `renderContainer` is true) |

## Types

```ts
/** A single block from the plugin's serializedBlocks REST field */
interface Block {
  name: string                        // e.g. "core/paragraph"
  _key: string                        // Unique MD5 key for React reconciliation
  content: string                     // Pre-extracted text/HTML content
  attributes: Record<string, unknown> // Block-specific attributes
  children: Block[]                   // Nested inner blocks
}

/** Map of block name → React component */
type SerializerMap = Record<string, ComponentType<BlockProps>>

/** Props received by each block component */
interface BlockProps {
  name: string
  _key?: string
  content?: string
  children?: ReactNode
  [key: string]: unknown  // Spread from block.attributes
}
```

## Basic Usage

```tsx
import { BlockContent } from '@iwritec0de/blockbridge-react'
import '@iwritec0de/blockbridge-react/style.css'

<BlockContent blocks={post.serializedBlocks} />
```

## With Container Wrapper

```tsx
<BlockContent blocks={blocks} renderContainer className="my-content" />
```

## Custom Serializers

```tsx
import { BlockContent } from '@iwritec0de/blockbridge-react'
import type { SerializerMap } from '@iwritec0de/blockbridge-react'

const userSerializers: SerializerMap = {
  'core/paragraph': ({ content }) => (
    <p className="custom">{content}</p>
  ),
}

<BlockContent blocks={blocks} userSerializers={userSerializers} />
```

Custom serializers are **merged** with built-in ones — you only need to override the block types you want to change. Existing block renderers for other block types continue to work.

## Unsupported Blocks

For blocks with no built-in renderer and no custom renderer, `BlockContent` logs a warning and renders nothing for that block. No error is thrown.

## Adding New Block Types

Use `getSerializers` and `mergeSerializers` to compose a full serializer map:

```tsx
import {
  BlockContent,
  getSerializers,
  mergeSerializers,
} from '@iwritec0de/blockbridge-react'
import type { SerializerMap } from '@iwritec0de/blockbridge-react'

const MyCustomBlock = ({ content }: { content?: string }) => (
  <div className="my-custom-block">{content}</div>
)

const userSerializers: SerializerMap = {
  'my-plugin/custom-block': MyCustomBlock,
}

<BlockContent blocks={blocks} userSerializers={userSerializers} />
```
