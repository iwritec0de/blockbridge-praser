# Group Block

**Block name:** `core/group`

The Group block is a layout container that holds other blocks as `children`. It is the foundation for nested layouts.

## Serializer Output

```json
{
  "name": "core/group",
  "_key": "k1l2m3...",
  "content": "",
  "attributes": {
    "layout": {
      "type": "constrained"
    }
  },
  "children": [
    {
      "name": "core/heading",
      "_key": "l2m3n4...",
      "content": "Inside the group",
      "attributes": { "level": 3 },
      "children": []
    },
    {
      "name": "core/paragraph",
      "_key": "m3n4o5...",
      "content": "This paragraph is inside the group.",
      "attributes": {},
      "children": []
    }
  ]
}
```

The `layout` attribute is preserved only when set in WordPress. When absent, `attributes.layout` will be `undefined`.

## Rendered HTML

```html
<div class="wp-block-core-group">
  <h3 class="wp-block-core-heading">Inside the group</h3>
  <p class="wp-block-core-paragraph">This paragraph is inside the group.</p>
</div>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `layout` | `object` | WP layout descriptor (e.g. `{ "type": "constrained" }`) |
| `children` | `ReactNode` | Rendered inner blocks |

## Notes

- `core/column` and `core/columns` are also supported and follow the same container pattern
- `core/cover` is registered and renders inner blocks similarly
