# Verse Block

**Block name:** `core/verse`

The Verse block is preformatted text — intended for poetry, lyrics, and other content where line breaks matter. The plugin preserves newlines verbatim and strips the wrapping `<pre>` tag, handing the inner HTML to the renderer.

## Serializer Output

```json
{
  "name": "core/verse",
  "_key": "v1...",
  "content": "Roses are red\nViolets are blue\nWhitespace preserved\nJust for you",
  "attributes": {
    "textColor": "primary",
    "customTextColor": null
  },
  "children": []
}
```

## Rendered HTML

```html
<pre class="wp-block-verse has-text-color has-primary-color">
Roses are red
Violets are blue
Whitespace preserved
Just for you
</pre>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Raw verse content; newlines and indentation preserved |
| `textColor` | `string` | WP named color token |
| `customTextColor` | `string` | Hex color override (rendered via inline style) |
| `className` | `string` | Optional custom class name |

## Notes

- Inner HTML is parsed via `html-react-parser`, so inline `<em>`, `<strong>`, and anchor tags inside a verse survive intact.
- Do **not** use this block for code samples — prefer `core/code`, which skips HTML parsing entirely.
