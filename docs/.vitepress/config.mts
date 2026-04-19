import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'BlockBridge React',
  description: 'Render WordPress Gutenberg blocks as React components',
  base: '/blockbridge-react/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Blocks', link: '/blocks/' },
      {
        text: 'v1.0.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          {
            text: 'npm',
            link: 'https://www.npmjs.com/package/@iwritec0de/blockbridge-react',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'WordPress Plugin Setup', link: '/guide/plugin-setup' },
            { text: 'First Render', link: '/guide/first-render' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'BlockContent', link: '/api/block-content' },
            { text: 'Block Components', link: '/api/block-components' },
          ],
        },
      ],
      '/blocks/': [
        {
          text: 'Supported Blocks',
          items: [
            { text: 'Overview', link: '/blocks/' },
            { text: 'Paragraph', link: '/blocks/paragraph' },
            { text: 'Heading', link: '/blocks/heading' },
            { text: 'Image', link: '/blocks/image' },
            { text: 'List', link: '/blocks/list' },
            { text: 'Quote', link: '/blocks/quote' },
            { text: 'Button / Buttons', link: '/blocks/button' },
            { text: 'Group', link: '/blocks/group' },
            { text: 'Columns / Column', link: '/blocks/columns' },
            { text: 'Cover', link: '/blocks/cover' },
            { text: 'Separator / Spacer', link: '/blocks/separator-spacer' },
            { text: 'Table', link: '/blocks/table' },
            { text: 'Code', link: '/blocks/code' },
            { text: 'Verse', link: '/blocks/verse' },
            { text: 'Embed', link: '/blocks/embed' },
            { text: 'Media (Audio / Video / File)', link: '/blocks/media' },
            { text: 'Media & Text', link: '/blocks/media-text' },
            { text: 'Gallery', link: '/blocks/gallery' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/iwritec0de/blockbridge-react',
      },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright © 2024 Chris Kelley',
    },
  },
})
