# Table Block

**Block name:** `core/table`

## Serializer Output

```json
{
  "name": "core/table",
  "_key": "p6q7r8...",
  "content": "",
  "attributes": {
    "hasFixedLayout": false,
    "head": [
      {
        "cells": [
          { "content": "Name", "tag": "th" },
          { "content": "Role", "tag": "th" }
        ]
      }
    ],
    "body": [
      {
        "cells": [
          { "content": "Alice", "tag": "td" },
          { "content": "Engineer", "tag": "td" }
        ]
      },
      {
        "cells": [
          { "content": "Bob", "tag": "td" },
          { "content": "Designer", "tag": "td" }
        ]
      }
    ],
    "foot": []
  },
  "children": []
}
```

Table data is entirely in `attributes` — the `head`, `body`, and `foot` arrays come directly from WordPress block attributes without further transformation.

## Rendered HTML

```html
<figure class="wp-block-core-table">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice</td>
        <td>Engineer</td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>Designer</td>
      </tr>
    </tbody>
  </table>
</figure>
```

## Key Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `hasFixedLayout` | `boolean` | Apply `table-layout: fixed` |
| `head` | `Row[]` | Array of header row objects |
| `body` | `Row[]` | Array of body row objects |
| `foot` | `Row[]` | Array of footer row objects |

Each `Row` has a `cells` array where each cell has `{ content: string, tag: 'th' | 'td' }`.
