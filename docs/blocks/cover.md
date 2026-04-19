# Cover Block

**Block name:** `core/cover`

The Cover block is a hero-style container with a background image (or color), an optional dim overlay, and inner blocks rendered on top.

## Serializer Output

```json
{
  "name": "core/cover",
  "_key": "cv1...",
  "attributes": {
    "url": "https://example.com/wp-content/uploads/hero.jpg",
    "dimRatio": 40,
    "overlayColor": "black",
    "hasParallax": false,
    "focalPoint": { "x": 0.5, "y": 0.3 },
    "minHeight": 480,
    "minHeightUnit": "px",
    "contentPosition": "center center",
    "align": "full"
  },
  "children": [
    { "name": "core/heading", "content": "Welcome", "attributes": { "mark": "h1" } }
  ]
}
```

## Rendered HTML

```html
<div class="wp-block-cover alignfull" style="min-height:480px">
  <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim has-background-dim-40"></span>
  <img class="wp-block-cover__image-background" alt="" aria-hidden="true"
       src="https://example.com/wp-content/uploads/hero.jpg"
       style="object-position:50.00% 30.00%" />
  <div class="wp-block-cover__inner-container">
    <h1>Welcome</h1>
  </div>
</div>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Background image URL (omit for color-only covers) |
| `dimRatio` | `number` | Overlay opacity `0`–`100`; snapped to the nearest 10 for the `has-background-dim-*` class |
| `overlayColor` | `string` | WP named color token for the overlay |
| `customOverlayColor` | `string` | Hex color override for the overlay |
| `hasParallax` | `boolean` | Adds `.has-parallax`; actual parallax is a CSS concern |
| `focalPoint` | `{ x: number; y: number }` | Background image focal point, each value `0`–`1` |
| `minHeight` | `number` | Numeric min-height |
| `minHeightUnit` | `string` | Unit for `minHeight` (defaults to `px`) |
| `contentPosition` | `string` | Inner-block alignment (`"center center"`, `"top left"`, …) |
| `align` | `string` | Block alignment (`"wide"`, `"full"`, etc.) |
| `children` | `Block[]` | Inner blocks rendered inside the cover |

## Notes

- If `dimRatio` is `0` no overlay element is rendered.
- `customOverlayColor` takes precedence over `overlayColor` at render time via inline style.
