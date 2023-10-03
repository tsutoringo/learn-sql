// https://vitepress.dev/guide/custom-theme
import './style.css';
import './style/splitpanes.scss';

import App from './App.vue';

import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/fonts.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';

export default {
  Layout: App,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
};
