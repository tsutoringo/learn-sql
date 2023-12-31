import { defineConfig } from 'vitepress';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  title: 'SQLで〜たべ〜す',
  description: 'データベースじっこー',
  vite: {
    plugins: [
      visualizer({})
    ],
    optimizeDeps: {
      include: [
        'monaco-sql-languages/out/esm/sql/sql.worker'
      ]
    }
  },
  head: [
    ['link', { rel: 'preconnect',              href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect',              href: 'https://fonts.gstatic.com', 'crossorigin': ''}],
    ['link', { rel: 'preload',    as: 'style', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap' }],
    ['link', { rel: 'stylesheet',              href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap' }]
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
          { text: 'このサイトの使い方', link: '/introduction/how-to-use' },
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
          { 'text': 'Markdwon Examples', link: '/vitepress/markdown-examples' },
          { 'text': 'API Examples', link: '/vitepress/api-examples' },
          { 'text': 'GitHub', link: 'https://github.com/tsutoringo/learn-sql' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
});
