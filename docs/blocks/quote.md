# Quote Block

**Block name:** `core/quote`

## Serializer Output

```json
{
  "name": "core/quote",
  "_key": "g7h8i9...",
  "content": "<blockquote class=\"wp-block-quote\"><p>The best time to plant a tree was 20 years ago.</p></blockquote>",
  "attributes": {
    "citation": "Chinese Proverb"
  },
  "children": []
}
```

`content` is the full `innerHTML` of the blockquote element. The `citation` attribute is omitted from the schema when empty.

## Rendered HTML

```html
<figure class="wp-block-core-quote">
  <blockquote>
    <p>The best time to plant a tree was 20 years ago.</p>
    <cite>Chinese Proverb</cite>
  </blockquote>
</figure>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Full blockquote innerHTML |
| `citation` | `string` | Citation text (absent when empty) |
