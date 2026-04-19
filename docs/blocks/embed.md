# Embed Block

**Block name:** `core/embed`

The Embed block wraps external media in a sanitized iframe. Common providers (YouTube, Vimeo) get a responsive wrapper and their canonical embed URL. Twitter / X falls back to a link-bearing `<blockquote>`. Everything else renders as a generic iframe.

## Serializer Output

```json
{
  "name": "core/embed",
  "_key": "em1...",
  "attributes": {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "providerNameSlug": "youtube",
    "type": "video",
    "responsive": true,
    "caption": "Never gonna give you up"
  },
  "children": []
}
```

The plugin unsets `caption` when it's empty so consumers can do a simple truthy check instead of an empty-string comparison.

## Rendered HTML (YouTube)

```html
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed--responsive">
  <div class="wp-block-embed__wrapper">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allowfullscreen title="youtube embed" loading="lazy"></iframe>
  </div>
  <figcaption>Never gonna give you up</figcaption>
</figure>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Source URL — routed through `sanitizeUrl` (http/https only) |
| `providerNameSlug` | `string` | Lowercase provider slug: `"youtube"`, `"vimeo"`, `"twitter"`, etc. |
| `type` | `string` | Embed type (`"video"`, `"rich"`, `"photo"`, …) |
| `responsive` | `boolean` | Adds `.wp-block-embed--responsive` for video providers |
| `caption` | `string` | Optional caption — parsed as HTML so basic markup is preserved |

## Security Notes

- Every URL passes through `sanitizeUrl`, which accepts only `http:` and `https:` schemes. `javascript:`, `data:`, and relative URLs return empty and the iframe is not rendered.
- YouTube watch / youtu.be links are rewritten to `https://www.youtube.com/embed/{id}`. Vimeo likewise to `https://player.vimeo.com/video/{id}`. Other providers render the sanitized URL as-is.
