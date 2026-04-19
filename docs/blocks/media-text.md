# Media & Text Block

**Block name:** `core/media-text`

A side-by-side layout with a media element (image or video) and a text column. Inner text blocks appear in `children`.

## Serializer Output

```json
{
  "name": "core/media-text",
  "_key": "t0u1v2...",
  "content": "",
  "attributes": {
    "mediaId": 42,
    "media": "https://example.com/wp-content/uploads/feature.jpg",
    "altText": "Feature image",
    "mediaType": "image",
    "mediaPosition": "left",
    "isStackedOnMobile": true,
    "verticalAlignment": "center"
  },
  "children": [
    {
      "name": "core/paragraph",
      "_key": "u1v2w3...",
      "content": "Alongside the image goes this text.",
      "attributes": {},
      "children": []
    }
  ]
}
```

The plugin resolves `media` (the full URL) from the WordPress attachment `mediaId` using `wp_get_attachment_image_src`. `altText` is extracted from the block's innerHTML.

## Rendered HTML

```html
<div class="wp-block-core-media-text is-stacked-on-mobile">
  <figure class="wp-block-media-text__media">
    <img src="https://example.com/wp-content/uploads/feature.jpg" alt="Feature image" />
  </figure>
  <div class="wp-block-media-text__content">
    <p class="wp-block-core-paragraph">Alongside the image goes this text.</p>
  </div>
</div>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `media` | `string` | Resolved media URL |
| `altText` | `string` | Media alt text |
| `mediaType` | `string` | `'image'` or `'video'` |
| `mediaPosition` | `string` | `'left'` or `'right'` |
| `isStackedOnMobile` | `boolean` | Stack columns on small screens |
| `verticalAlignment` | `string` | `'top'`, `'center'`, `'bottom'` |
| `children` | `ReactNode` | Rendered inner text blocks |
