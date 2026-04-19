# Separator / Spacer Blocks

## Separator

**Block name:** `core/separator`

### Serializer Output

```json
{
  "name": "core/separator",
  "_key": "n4o5p6...",
  "content": "",
  "attributes": {
    "variant": "wide"
  },
  "children": []
}
```

`variant` is derived by the plugin from the block's `className`:
- `is-style-dots` → `"dots"`
- `is-style-wide` → `"wide"`
- _(default)_ → `"default"`

### Rendered HTML

```html
<!-- variant: default -->
<hr class="wp-block-core-separator gbtr-separator-default" />

<!-- variant: wide -->
<hr class="wp-block-core-separator gbtr-separator-wide" />

<!-- variant: dots -->
<hr class="wp-block-core-separator gbtr-separator-dots" />
```

### Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `variant` | `'default' \| 'wide' \| 'dots'` | Visual style derived from className |

---

## Spacer

**Block name:** `core/spacer`

### Serializer Output

```json
{
  "name": "core/spacer",
  "_key": "o5p6q7...",
  "content": "",
  "attributes": {
    "height": "40px"
  },
  "children": []
}
```

### Rendered HTML

```html
<div class="wp-block-core-spacer" style="height: 40px;"></div>
```

### Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `height` | `string` | CSS height value (e.g. `40px`, `2rem`) |
