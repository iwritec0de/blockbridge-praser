# Heading Block

**Block name:** `core/heading`

## Serializer Output

```json
{
  "name": "core/heading",
  "_key": "b2c3d4...",
  "content": "My Section Title",
  "attributes": {
    "level": 2,
    "mark": "h2",
    "anchor": "my-section-title",
    "align": "left",
    "textColor": "primary",
    "fontSize": "x-large"
  },
  "children": []
}
```

The plugin extracts `mark` (the HTML tag string, e.g. `"h2"`) and `anchor` (the `id` attribute) from the block's innerHTML. `content` is the heading text with the wrapping tag stripped.

## Rendered HTML

```html
<h2 id="my-section-title" class="wp-block-core-heading has-x-large-font-size has-primary-color has-text-color">
  My Section Title
</h2>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Heading text (tag stripped) |
| `level` | `number` | Heading level 1–6 |
| `mark` | `string` | HTML tag string extracted by plugin (e.g. `h2`) |
| `anchor` | `string` | `id` attribute value for in-page links |
| `align` | `string` | Text alignment |
| `textColor` | `string` | WP named color token |
| `customTextColor` | `string` | Hex color override |
| `fontSize` | `string` | WP named font size token |
