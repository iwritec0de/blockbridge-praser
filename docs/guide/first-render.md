# First Render

Once the plugin is active and the library is installed, rendering blocks is a single component call.

## Fetch and Render

The plugin adds a `serializedBlocks` field to every post in the WordPress REST API. Pass that array directly to `BlockContent`:

```tsx
import { BlockContent } from '@iwritec0de/blockbridge-react'
import '@iwritec0de/blockbridge-react/style.css'

interface WPPost {
  id: number
  title: { rendered: string }
  serializedBlocks: Block[]
}

export default function PostPage({ postId }: { postId: number }) {
  const [post, setPost] = React.useState<WPPost | null>(null)

  React.useEffect(() => {
    fetch(`https://yoursite.com/wp-json/wp/v2/posts/${postId}`)
      .then((r) => r.json())
      .then(setPost)
  }, [postId])

  if (!post) return <p>Loading…</p>

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <BlockContent blocks={post.serializedBlocks} />
    </article>
  )
}
```

## What the Data Looks Like

Each block in `serializedBlocks` follows the `Block` shape:

```json
{
  "name": "core/paragraph",
  "_key": "a1b2c3d4e5f6...",
  "content": "Hello <strong>world</strong>",
  "attributes": {
    "dropCap": false,
    "align": "left"
  },
  "children": []
}
```

Nested blocks (e.g., `core/group` containing other blocks) appear in the `children` array using the same shape.

## Wrapping in a Container Element

By default `BlockContent` returns a flat list of React nodes with no wrapper. To wrap everything in a `<div>`:

```tsx
<BlockContent blocks={blocks} renderContainer className="my-content" />
```

You can also supply a fully custom wrapper:

```tsx
<BlockContent
  blocks={blocks}
  renderContainer
  wrapperComponent={({ className, children }) => (
    <section className={className}>{children}</section>
  )}
/>
```

## Custom Block Renderers

Pass a `userSerializers` map to override any block type with your own component:

```tsx
import { BlockContent } from '@iwritec0de/blockbridge-react'
import type { SerializerMap } from '@iwritec0de/blockbridge-react'

const userSerializers: SerializerMap = {
  'core/paragraph': ({ content }) => (
    <p className="my-paragraph">{content}</p>
  ),
  'core/heading': ({ content, level }) => {
    const Tag = `h${level ?? 2}` as keyof JSX.IntrinsicElements
    return <Tag className="my-heading">{content}</Tag>
  },
}

<BlockContent blocks={blocks} userSerializers={userSerializers} />
```

Each serializer receives the block's spread attributes plus `name`, `_key`, `content`, and `children`.

## Next Steps

- [API Reference](/api/) — full prop docs for `BlockContent` and all components
- [Supported Blocks](/blocks/) — block-by-block serializer output and render examples
