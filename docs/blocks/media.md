# Media Blocks (Audio / Video / File)

## Audio

**Block name:** `core/audio`

### Serializer Output

```json
{
  "name": "core/audio",
  "_key": "q7r8s9...",
  "content": "",
  "attributes": {
    "src": "https://example.com/wp-content/uploads/podcast.mp3",
    "caption": "Episode 12: Getting Started",
    "autoplay": false,
    "loop": false,
    "preload": "none"
  },
  "children": []
}
```

### Rendered HTML

```html
<figure class="wp-block-core-audio">
  <audio src="https://example.com/wp-content/uploads/podcast.mp3" preload="none" controls></audio>
  <figcaption>Episode 12: Getting Started</figcaption>
</figure>
```

### Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Audio file URL |
| `caption` | `string` | Caption text |
| `autoplay` | `boolean` | Autoplay on load |
| `loop` | `boolean` | Loop playback |
| `preload` | `string` | `'none'`, `'metadata'`, `'auto'` |

---

## Video

**Block name:** `core/video`

### Serializer Output

```json
{
  "name": "core/video",
  "_key": "r8s9t0...",
  "content": "",
  "attributes": {
    "src": "https://example.com/wp-content/uploads/demo.mp4",
    "caption": "Product demo video",
    "controls": true,
    "autoplay": false,
    "loop": false,
    "muted": false,
    "poster": "https://example.com/wp-content/uploads/poster.jpg"
  },
  "children": []
}
```

### Rendered HTML

```html
<figure class="wp-block-core-video">
  <video
    src="https://example.com/wp-content/uploads/demo.mp4"
    poster="https://example.com/wp-content/uploads/poster.jpg"
    controls
  ></video>
  <figcaption>Product demo video</figcaption>
</figure>
```

### Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Video file URL |
| `caption` | `string` | Caption text |
| `controls` | `boolean` | Show native video controls |
| `autoplay` | `boolean` | Autoplay on load |
| `loop` | `boolean` | Loop playback |
| `muted` | `boolean` | Mute audio |
| `poster` | `string` | Poster image URL |

---

## File

**Block name:** `core/file`

### Serializer Output

```json
{
  "name": "core/file",
  "_key": "s9t0u1...",
  "content": "",
  "attributes": {
    "href": "https://example.com/wp-content/uploads/report.pdf",
    "fileName": "Annual Report 2024",
    "textLinkHref": "https://example.com/wp-content/uploads/report.pdf",
    "showDownloadButton": true,
    "downloadButtonText": "Download PDF"
  },
  "children": []
}
```

### Rendered HTML

```html
<div class="wp-block-core-file">
  <a href="https://example.com/wp-content/uploads/report.pdf">Annual Report 2024</a>
  <a
    href="https://example.com/wp-content/uploads/report.pdf"
    download
    class="wp-block-file__button"
  >
    Download PDF
  </a>
</div>
```

### Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `href` | `string` | File URL |
| `fileName` | `string` | Display name / text link label |
| `textLinkHref` | `string` | Text link URL (may differ from `href`) |
| `showDownloadButton` | `boolean` | Show separate download button |
| `downloadButtonText` | `string` | Download button label |
