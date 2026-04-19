# List Block

**Block names:** `core/list`, `core/list-item`

## Serializer Output

```json
{
  "name": "core/list",
  "_key": "d4e5f6...",
  "content": "",
  "attributes": {
    "ordered": false
  },
  "children": [
    {
      "name": "core/list-item",
      "_key": "e5f6a7...",
      "content": "First item",
      "attributes": {},
      "children": []
    },
    {
      "name": "core/list-item",
      "_key": "f6a7b8...",
      "content": "Second item",
      "attributes": {},
      "children": []
    }
  ]
}
```

`ordered` defaults to `false` (WordPress omits it when not set). The plugin normalizes this explicitly.

## Rendered HTML

```html
<!-- ordered: false -->
<ul class="wp-block-core-list">
  <li class="wp-block-core-list-item">First item</li>
  <li class="wp-block-core-list-item">Second item</li>
</ul>

<!-- ordered: true -->
<ol class="wp-block-core-list">
  <li class="wp-block-core-list-item">First item</li>
</ol>
```

## Key Attributes

### core/list
| Attribute | Type | Description |
|-----------|------|-------------|
| `ordered` | `boolean` | `true` → `<ol>`, `false` → `<ul>` |
| `children` | `ReactNode` | Rendered `core/list-item` blocks |

### core/list-item
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Item text (li tag stripped) |
