# Block Components

Block components are internal renderers registered in the default `SerializerMap`. They are not exported from the package root (except `Image` and `DefaultBlock`). You typically interact with them by passing `userSerializers` to `BlockContent`.

## Component Props Pattern

Every block component receives props that are the **spread of `block.attributes`** plus the standard fields:

| Prop | Type | Source |
|------|------|--------|
| `name` | `string` | `block.name` |
| `_key` | `string` | `block._key` |
| `content` | `string` | `block.content` (pre-extracted HTML/text) |
| `children` | `ReactNode` | Rendered inner blocks |
| `...attributes` | `unknown` | All fields from `block.attributes` |

## Writing a Custom Serializer

```ts
import type { BlockProps } from '@iwritec0de/blockbridge-react'

const MyParagraph: React.FC<BlockProps> = ({ content, className, align }) => (
  <p
    className={`my-para ${className ?? ''}`}
    style={{ textAlign: align as React.CSSProperties['textAlign'] }}
  >
    {content}
  </p>
)
```

## Built-In Component Attribute Reference

The following table lists the key attributes extracted by the PHP plugin for each block type. All are available on the props object of a custom serializer.

### core/paragraph
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` _(prop)_ | `string` | Inner HTML with tags stripped |
| `dropCap` | `boolean` | Drop cap first letter |
| `align` | `string` | Text alignment |
| `fontSize` | `string` | WP named font size |
| `textColor` / `customTextColor` | `string` | Named or hex color |
| `backgroundColor` / `customBackgroundColor` | `string` | Named or hex background |

### core/heading
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` _(prop)_ | `string` | Inner text |
| `level` | `number` | Heading level (1–6) |
| `mark` | `string` | HTML tag extracted by plugin (e.g. `h2`) |
| `anchor` | `string` | `id` attribute value |
| `align` | `string` | Text alignment |

### core/image
| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Image URL |
| `alt` | `string` | Alt text |
| `caption` | `string` | Caption HTML |
| `href` | `string` | Link URL (wraps image) |
| `width` | `number` | Image width |
| `height` | `number` | Image height |

### core/list
| Attribute | Type | Description |
|-----------|------|-------------|
| `ordered` | `boolean` | `true` → `<ol>`, `false` → `<ul>` |
| `children` _(prop)_ | `ReactNode` | Rendered `core/list-item` children |

### core/list-item
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` _(prop)_ | `string` | List item text (tags stripped) |

### core/quote
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` _(prop)_ | `string` | Full blockquote innerHTML |
| `citation` | `string` | Citation text (omitted when empty) |

### core/button
| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Link href |
| `text` | `string` | Button label |
| `linkTarget` | `string` | `_blank` etc. |
| `rel` | `string` | Link rel attribute |
| `backgroundColor` | `string` | Named WP color |
| `textColor` | `string` | Named WP color |
| `variant` | `'fill' \| 'outline'` | Derived from className |

### core/buttons
Container only. `children` contains rendered `core/button` nodes.

### core/group
| Attribute | Type | Description |
|-----------|------|-------------|
| `layout` | `object` | WP layout object (if set) |
| `children` _(prop)_ | `ReactNode` | Nested block renders |

### core/separator
| Attribute | Type | Description |
|-----------|------|-------------|
| `variant` | `'default' \| 'wide' \| 'dots'` | Derived from className |

### core/spacer
| Attribute | Type | Description |
|-----------|------|-------------|
| `height` | `string` | CSS height value |

### core/table
| Attribute | Type | Description |
|-----------|------|-------------|
| `head` | `array` | Table head rows |
| `body` | `array` | Table body rows |
| `foot` | `array` | Table foot rows |
| `hasFixedLayout` | `boolean` | Fixed column widths |

### core/media-text
| Attribute | Type | Description |
|-----------|------|-------------|
| `media` | `string` | Media URL (resolved by plugin) |
| `altText` | `string` | Media alt text |
| `mediaType` | `string` | `'image'` or `'video'` |
| `isStackedOnMobile` | `boolean` | Stack media+text on small screens |

### core/audio
| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Audio file URL |
| `caption` | `string` | Caption text |
| `autoplay` | `boolean` | Autoplay on load |
| `loop` | `boolean` | Loop playback |
| `preload` | `string` | `'none'`, `'metadata'`, `'auto'` |

### core/video
| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Video file URL |
| `caption` | `string` | Caption text |
| `controls` | `boolean` | Show native controls |
| `autoplay` | `boolean` | Autoplay on load |
| `loop` | `boolean` | Loop playback |
| `muted` | `boolean` | Mute audio |
| `poster` | `string` | Poster image URL |

### core/file
| Attribute | Type | Description |
|-----------|------|-------------|
| `href` | `string` | File URL |
| `fileName` | `string` | Display name |
| `textLinkHref` | `string` | Text link URL |
| `showDownloadButton` | `boolean` | Show download button |
| `downloadButtonText` | `string` | Button label |
