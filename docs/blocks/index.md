# Supported Blocks

BlockBridge React supports the following WordPress core blocks. Each page shows the serializer output shape (JSON from the `serializedBlocks` REST field) and the rendered HTML output.

## Block Catalog

| Block | Block Name | Phase |
|-------|-----------|-------|
| [Paragraph](./paragraph) | `core/paragraph` | Foundation |
| [Heading](./heading) | `core/heading` | Foundation |
| [Image](./image) | `core/image` | Phase 2 |
| [List](./list) | `core/list`, `core/list-item` | Phase 2 |
| [Quote](./quote) | `core/quote` | Phase 2 |
| [Button / Buttons](./button) | `core/button`, `core/buttons` | Phase 2 |
| [Group](./group) | `core/group` | Phase 2 |
| [Columns / Column](./columns) | `core/columns`, `core/column` | Foundation |
| [Cover](./cover) | `core/cover` | Foundation |
| [Separator / Spacer](./separator-spacer) | `core/separator`, `core/spacer` | Phase 2b |
| [Table](./table) | `core/table` | Phase 2b |
| [Code](./code) | `core/code` | Phase 3 |
| [Verse](./verse) | `core/verse` | Phase 3 |
| [Embed](./embed) | `core/embed` (YouTube, Vimeo, Twitter, generic) | Phase 3 |
| [Media (Audio / Video / File)](./media) | `core/audio`, `core/video`, `core/file` | Phase 2b |
| [Media & Text](./media-text) | `core/media-text` | Foundation |
| [Gallery](./gallery) | `core/gallery` | Phase 2b |

## How Serialization Works

The BlockBridge WP plugin adds a `serializedBlocks` field to the WordPress REST API response for posts and pages. Each block is serialized as:

```json
{
  "name": "core/paragraph",
  "_key": "md5hash...",
  "content": "Extracted text or HTML",
  "attributes": { "...": "block-specific" },
  "children": []
}
```

The `content` field is pre-extracted by the plugin (e.g., paragraph text with the `<p>` tag stripped). The `attributes` shape is block-specific — see each block's page for the full schema.

## Fallback via DefaultBlock

Any block that's registered on the server but not explicitly wired up (or any unknown custom block) is rendered by `DefaultBlock`, which emits the block's raw `innerHTML`. This is the safety net — expect future core blocks (e.g. `core/html`, `core/preformatted`, `core/pullquote`) to keep working without a praser release, just with less semantic structure.
