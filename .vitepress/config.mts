import { defineConfig } from 'vitepress';
import { default as monacoEditorPlugin } from 'vite-plugin-monaco-editor';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SQLで〜たべ〜す",
  description: "データベースじっこー",
  vite: {
    plugins: [
      (monacoEditorPlugin as any).default({
        languageWorkers: [],
        customWorkers: [
          { label: 'sql', entry: 'monaco-sql-languages/out/esm/sql/sql.worker' }
        ]
      })
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
});
