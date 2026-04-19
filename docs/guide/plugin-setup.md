# WordPress Plugin Setup

The BlockBridge WP plugin adds a `serializedBlocks` field to every post and page in the WordPress REST API. This field contains the structured block data that the React library renders.

## Installation

### Via WordPress Admin

1. Download the plugin zip from [GitHub Releases](https://github.com/iwritec0de/blockbridge-wp/releases)
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload the zip and click **Install Now**
4. Click **Activate Plugin**

### Via WP-CLI

```bash
wp plugin install path/to/blockbridge-wp.zip --activate
```

### Manual (Development)

```bash
cd wp-content/plugins
git clone https://github.com/iwritec0de/blockbridge-wp blockbridge-wp
```

Then activate in **Plugins → Installed Plugins**.

## Verification

After activation, fetch any post from the REST API and confirm the `serializedBlocks` field is present:

```bash
curl https://yoursite.com/wp-json/wp/v2/posts/1 | jq '.serializedBlocks'
```

You should see an array of block objects:

```json
[
  {
    "blockName": "core/paragraph",
    "attributes": {
      "content": "Hello world",
      "dropCap": false
    },
    "innerBlocks": []
  }
]
```
