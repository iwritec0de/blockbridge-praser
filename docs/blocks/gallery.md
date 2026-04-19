# Gallery Block

**Block name:** `core/gallery`

::: warning Not yet fully implemented
The Gallery block currently renders via `DefaultBlock` (raw innerHTML). Full serializer support with the `Gallery` component is planned in Feature #15.
:::

## Current Behavior

`core/gallery` is registered in the serializer map but mapped to `DefaultBlock`, which renders the raw `innerHTML` of the block. The output is functional but unstyled by the praser component library.

## Planned Serializer Output (Feature #15)

Once Feature #15 is complete, the serializer output will look like:

```json
{
  "name": "core/gallery",
  "_key": "v2w3x4...",
  "content": "",
  "attributes": {
    "columns": 3,
    "cropImages": true
  },
  "children": [
    {
      "name": "core/image",
      "_key": "w3x4y5...",
      "content": "",
      "attributes": {
        "src": "https://example.com/photo1.jpg",
        "alt": "First photo",
        "caption": ""
      },
      "children": []
    }
  ]
}
```

The gallery renders a CSS grid using `--gallery-columns` as a CSS custom property, with each image rendered via the `Image` component. `cropImages` adds a modifier class to enforce aspect ratio via `object-fit: cover`.

## Custom Serializer (current workaround)

Until Feature #15 ships, you can override `core/gallery` with your own renderer:

```tsx
import { BlockContent } from '@iwritec0de/blockbridge-react'
import type { SerializerMap } from '@iwritec0de/blockbridge-react'

const userSerializers: SerializerMap = {
  'core/gallery': ({ content }) => (
    <div
      className="my-gallery"
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
    />
  ),
}

<BlockContent blocks={blocks} userSerializers={userSerializers} />
```
