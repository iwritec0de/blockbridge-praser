# Columns / Column Blocks

**Block names:** `core/columns` (container), `core/column` (individual)

The Columns block is a multi-column layout container. Each child is a `core/column` that contains its own `children` — the inner blocks rendered inside that column.

## Serializer Output

```json
{
  "name": "core/columns",
  "_key": "co1...",
  "attributes": {},
  "children": [
    {
      "name": "core/column",
      "_key": "co2...",
      "attributes": {},
      "children": [
        { "name": "core/paragraph", "content": "Left column text" }
      ]
    },
    {
      "name": "core/column",
      "_key": "co3...",
      "attributes": {},
      "children": [
        { "name": "core/paragraph", "content": "Right column text" }
      ]
    }
  ]
}
```

## Rendered HTML

```html
<div class="wp-block-columns">
  <div class="wp-block-column">
    <p>Left column text</p>
  </div>
  <div class="wp-block-column">
    <p>Right column text</p>
  </div>
</div>
```

## Key Attributes

Both `core/columns` and `core/column` are thin layout containers — the serializer forwards no structured attributes beyond the standard `className`. The nesting itself is the meaningful data.

| Attribute | Type | Description |
|-----------|------|-------------|
| `className` | `string` | Optional custom class name |
| `children` | `Block[]` | Inner blocks rendered inside the container |

## Notes

- Column widths are controlled by CSS (see `praser/src/css/blocks/columns.css`) — the serializer does not emit per-column width attributes.
- Nest any supported block inside a column, including another `core/columns`.
