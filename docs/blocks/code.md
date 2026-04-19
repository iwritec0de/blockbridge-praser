# Code Block

**Block name:** `core/code`

## Serializer Output

```json
{
  "name": "core/code",
  "_key": "c1d2e3...",
  "content": "const x = 1;\nconsole.log(x);",
  "attributes": {},
  "children": []
}
```

The plugin extracts the contents of the `<code>` tag from the block's `innerHTML`, preserving newlines so indentation is kept verbatim.

## Rendered HTML

```html
<pre class="wp-block-code">
  <code>const x = 1;
console.log(x);</code>
</pre>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | `string` | Raw code contents with newlines preserved |
| `className` | `string` | Optional custom class name |

## Notes

- HTML in `content` is NOT parsed — the string is rendered as text so angle brackets survive.
- If you need syntax highlighting, wrap the `Code` block with a custom serializer that feeds `content` into Prism, Shiki, or similar.
