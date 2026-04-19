# Paragraph Block

**Block name:** `core/paragraph`

## Serializer Output

```json
{
  "name": "core/paragraph",
  "_key": "a1b2c3...",
  "content": "This is a paragraph with <strong>bold</strong> text.",
  "attributes": {
    "dropCap": false,
    "align": "left",
    "fontSize": "large",
    "textColor": "primary"
  },
  "children": []
}
```

## Rendered HTML

```html
<p class="wp-block-core-paragraph has-large-font-size has-primary-color has-text-color">
  This is a paragraph with <strong>bold</strong> text.
</p>
```

## Custom Serializer Example

```tsx
import type { SerializerMap } from '@iwritec0de/blockbridge-react'

const userSerializers: SerializerMap = {
  'core/paragraph': ({ content, dropCap, align }) => (
    <p
      className={dropCap ? 'has-drop-cap' : ''}
      style={{ textAlign: align as React.CSSProperties['textAlign'] }}
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
    />
  ),
}
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Inner HTML (inline tags preserved) |
| `dropCap` | `boolean` | Stylistic drop cap on first letter |
| `align` | `string` | `left`, `center`, `right`, `justify` |
| `fontSize` | `string` | WP named font size token |
| `textColor` | `string` | WP named color token |
| `customTextColor` | `string` | Hex color override |
| `backgroundColor` | `string` | WP named background color |
| `customBackgroundColor` | `string` | Hex background override |
