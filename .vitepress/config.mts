import { defineConfig } from 'vitepress';
import { default as monacoEditorPlugin } from 'vite-plugin-monaco-editor';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SQLで〜たべ〜す",
  description: "データベースじっこー",
  vite: {
    resolve: {
      alias: {
        'monaco-editor': `${process.cwd()}/node_modules/monaco-editor`,
      }
    },
    plugins: [
      (monacoEditorPlugin as any).default({
        languageWorkers: [],
        globalAPI: true
      })
    ]
  },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', 'crossorigin': ''}],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'ことサイトの使い方', link: '/introduction/how-to-use' },
        ]
      },
      {
        text: 'クエリ一覧',
        items: [
        ]
      },
      {
        text: 'その他',
        items: [
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
});
