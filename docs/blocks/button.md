# Button / Buttons Blocks

**Block names:** `core/buttons` (container), `core/button` (individual)

## Serializer Output

```json
{
  "name": "core/buttons",
  "_key": "h8i9j0...",
  "content": "",
  "attributes": {},
  "children": [
    {
      "name": "core/button",
      "_key": "i9j0k1...",
      "content": "",
      "attributes": {
        "url": "https://example.com/contact",
        "text": "Get in touch",
        "linkTarget": "_blank",
        "rel": "noopener",
        "backgroundColor": "primary",
        "textColor": "white",
        "variant": "fill"
      },
      "children": []
    },
    {
      "name": "core/button",
      "_key": "j0k1l2...",
      "content": "",
      "attributes": {
        "url": "https://example.com/learn-more",
        "text": "Learn more",
        "linkTarget": "",
        "rel": "",
        "backgroundColor": "",
        "textColor": "",
        "variant": "outline"
      },
      "children": []
    }
  ]
}
```

`variant` is derived by the plugin from the block's `className`: `is-style-outline` → `"outline"`, otherwise `"fill"`.

## Rendered HTML

```html
<div class="wp-block-core-buttons">
  <div class="wp-block-core-button">
    <a
      href="https://example.com/contact"
      target="_blank"
      rel="noopener"
      class="wp-block-button__link has-primary-background-color has-white-color has-text-color has-background gbtr-button-fill"
    >
      Get in touch
    </a>
  </div>
  <div class="wp-block-core-button">
    <a href="https://example.com/learn-more" class="wp-block-button__link gbtr-button-outline">
      Learn more
    </a>
  </div>
</div>
```

## Key Attributes

### core/button
| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Link href |
| `text` | `string` | Button label |
| `linkTarget` | `string` | `_blank` etc. (empty = same tab) |
| `rel` | `string` | Link `rel` attribute |
| `backgroundColor` | `string` | WP named color token |
| `textColor` | `string` | WP named color token |
| `variant` | `'fill' \| 'outline'` | Visual style (derived from className) |
