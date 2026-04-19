# Image Block

**Block name:** `core/image`

## Serializer Output

```json
{
  "name": "core/image",
  "_key": "c3d4e5...",
  "content": "",
  "attributes": {
    "src": "https://example.com/wp-content/uploads/photo.jpg",
    "alt": "A scenic mountain view",
    "caption": "Photo by Ansel Adams",
    "href": "https://example.com/gallery",
    "width": 1200,
    "height": 800
  },
  "children": []
}
```

## Rendered HTML

```html
<figure class="wp-block-core-image">
  <a href="https://example.com/gallery">
    <img
      src="https://example.com/wp-content/uploads/photo.jpg"
      alt="A scenic mountain view"
      width="1200"
      height="800"
    />
  </a>
  <figcaption>Photo by Ansel Adams</figcaption>
</figure>
```

When `href` is empty, the `<a>` wrapper is omitted. When `caption` is empty, `<figcaption>` is omitted.

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Image URL (from WP `url` attr) |
| `alt` | `string` | Alt text |
| `caption` | `string` | Caption HTML |
| `href` | `string` | Link wrapping the image (empty = no link) |
| `width` | `number` | Image width in pixels |
| `height` | `number` | Image height in pixels |
