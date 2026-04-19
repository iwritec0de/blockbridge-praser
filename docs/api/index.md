# API Overview

## Package Exports

```ts
import {
  // Main component
  BlockContent,

  // Utilities
  getSerializers,      // Returns the default SerializerMap
  mergeSerializers,    // Merges two SerializerMaps (user overrides built-ins)
  blocksToElements,    // Low-level: converts Block[] to React nodes
  cleanName,           // Converts "core/media-text" → "coreMediaText"

  // Individual components (for standalone use)
  DefaultBlock,
  Image,
} from '@iwritec0de/blockbridge-react'

// Types
import type {
  Block,
  BlockProps,
  SerializerMap,
} from '@iwritec0de/blockbridge-react'
```

::: info Block components are not individually exported
The full library of block components (`Paragraph`, `Heading`, `List`, etc.) are internal to the package and registered automatically via `getSerializers()`. Use `userSerializers` on `BlockContent` to override individual block renderers rather than importing components directly.
:::

## Exports Reference

| Export | Kind | Description |
|--------|------|-------------|
| `BlockContent` | Component | Main entry point — renders an array of `Block[]` |
| `Image` | Component | Exported for standalone or composition use |
| `DefaultBlock` | Component | Fallback renderer — renders raw `innerHTML` |
| `getSerializers` | Function | Returns the default `SerializerMap` for all built-in blocks |
| `mergeSerializers` | Function | Merges user serializers over the default map |
| `blocksToElements` | Function | Low-level render function (rarely needed directly) |
| `cleanName` | Function | Converts block name to CSS-safe camelCase string |
| `Block` | Type | A single serialized block from the plugin REST field |
| `BlockProps` | Type | Props shape for all block serializer components |
| `SerializerMap` | Type | `Record<string, ComponentType<BlockProps>>` |

## Pages

- [BlockContent](/api/block-content) — the main component, all props, custom serializer API
- [Block Components](/api/block-components) — internal block component props (for custom serializer authoring)
