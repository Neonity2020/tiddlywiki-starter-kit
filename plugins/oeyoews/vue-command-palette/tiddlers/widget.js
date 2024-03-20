/*\
title: $:/plugins/oeyoews/vue-command-palette/widget.js
type: application/javascript
module-type: widget

vue-command-palette widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class CMDWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }
    const { createApp } = window.Vue;

    const component = require('./app');
    const domNode = this.document.createElement('div');
    const TiddlyWikiVue = require('./plugins/TiddlyWikiVue');

    try {
      const app = createApp(component());

      app.use(TiddlyWikiVue);

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

      // 挂载
      app.mount(domNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e);
    }
  }

  // TIP: 界面由 vue 接管， 不要在这里刷新
  refresh() {
    return false;
  }
}

/** @description vue-command-palette widget */
exports['vue-cmd'] = CMDWidget;
