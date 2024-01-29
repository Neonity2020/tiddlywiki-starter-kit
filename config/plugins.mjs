// NOTE: vercel not support use { isCi } ???
import ci from 'ci-info';
import config from './index.js';

const enableMarkdown = config.markdown;

const localPlugins = [
  'oeyoews/tiddlywiki-publish-tiddler'
  // 'oeyoews/neotw-cli-info',
  // 'oeyoews/tiddlywiki-tid2png',
];

const onlinePlugins = [
  // 'oeyoews/tiddlywiki-readonly',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/neotw-notranslate'
];

// @deprecated, please use cm6
/* const cmePlugins = [
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/neotw-vimjk',
  'oeyoews/neotw-placeholder'
]; */

const markdowPlugins = ['tiddlywiki/markdown', 'oeyoews/markdown-kit'];

// oeyoews plugins
const oeyoewsPlugins = [
  'markdown-it-mermaid',
  'markdown-it-math',
  'tiddlywiki-full-text-search',
  'medium-zoom',
  'blockquote',
  'editor-preview-resizer',
  'confetti-background',
  'plum-blosssom',
  'confetti',
  'image-observer',
  'markdown-it-emoji',
  'markdown-it-pangu',
  'markdown-it-abbr',
  'markdown-it-front-matter',
  'markdown-it-github-alert',
  'markdown-it-smartarrows',
  'markdown-extensions-startup',
  'translate',
  'pangu',
  'ejs',
  'skill-badges',
  // 'artplayer',
  'notebook-theme-sidebar-resizer',
  'neotw-music-with-howler',
  'tiddlywiki-banners',
  'font-geist',
  'neotw-fetch',
  'qrcode',
  'hitokoto',
  'neotw-image-better',
  'notify',
  'NPL',
  'neotw-spotlight',
  'neotw-image-gallery',
  'neotw-links-gallery',
  'tiddlywiki-motion',
  'neotw-pwa',
  'neotw-zen-mode',
  'commandpalette',
  'neotw-icons',
  'neotw-copy-code',
  'tiddlywiki-daylight',
  'tiddlywiki-videos',
  'neotw',
  'echarts-addons',
  'neotw-info',
  'nprogress',
  'tiddlywiki-modal-ui',
  'tiddlywiki-tailwindcss-plus',
  'neotw-notion-gallery',
  'tiddlywiki-tiddler-info',
  'tiddlywiki-gravatar',
  'neotw-homepage'
];

const oeyoewsFormatedPlugins = oeyoewsPlugins.map((plugin) => {
  return `oeyoews/${plugin}`;
});

// based plugins
const plugins = [
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'tiddlywiki/pluginlibrary', // 不影响json 文件的生成, 但是需要负责生成index.html
  ...oeyoewsFormatedPlugins
];

enableMarkdown && plugins.push(...markdowPlugins);
// enableCME && localPlugins.push(...cmePlugins); // @deprecated

switch (ci.name) {
  case 'Vercel':
  case 'Netlify CI':
    plugins.push(...onlinePlugins);
    break;
  default:
    plugins.push(...localPlugins);
}

export default plugins;
