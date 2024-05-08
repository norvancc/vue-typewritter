import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '',
  description: 'A typewritter effect for typescript',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Guid',
        items: [
          { text: 'Getting Started', link: '/guid/getting-started' },
          { text: 'Configuration', link: '/guid/configuration' },
          { text: 'Component', link: '/guid/component' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Vue', link: '/examples/vue' },
          { text: 'React', link: '/examples/react' },
          { text: 'Typescript', link: '/examples/typescript' },
          { text: 'Javascript', link: '/examples/javascript' },
          { text: 'Uniapp', link: '/examples/uniapp' },
        ],
      },
    ],
    logo: '/logo_light.png',
    siteTitle: false,
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Guid',
        items: [
          { text: 'Getting Started', link: '/guid/getting-started' },
          { text: 'Configuration', link: '/guid/configuration' },
          { text: 'Component', link: '/guid/component' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Vue', link: '/examples/vue' },
          // { text: 'React', link: '/examples/react' },
          { text: 'Typescript', link: '/examples/typescript' },
          { text: 'Javascript', link: '/examples/javascript' },
          // { text: 'Uniapp', link: '/examples/uniapp' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Norvan CC',
    },
  },
});
