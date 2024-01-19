/*\
title: $:/plugins/oeyoews/notebook-theme-sidebar-resizer/widget.js
type: application/javascript
module-type: widget

notebook-theme-sidebar-resizer widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const en = require('./locales/en');

class NotebookResizer extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    // static
    this.VANILLA = 'vanilla';
    this.NOTEBOOK = 'notebook';
    this.LEFT = 'left';
    this.RIGHT = 'right';
    // default
    this.defaultWidthTiddler =
      '$:/themes/tiddlywiki/vanilla/metrics/sidebarwidth';
    this.nbWidthTiddler =
      '$:/plugins/oeyoews/notebook-theme-sidebar-resizer/default-sidebar-width';
    this.themeTiddler = '$:/theme';
    this.theme = null;
    this.isResizing = false;
    this.width = 0;
    this.defaultStateTiddler = '$:/state/sidebar';

    // notebook
    this.notebook = {
      name: 'NOTEBOOK',
      theme: [
        '$:/themes/nico/notebook',
        '$:/themes/oeyoews/notebook-plus' // for my custom notebook theme
      ],
      stateTiddler: '$:/state/notebook-sidebar',
      widthTiddler: '$:/themes/nico/notebook/metrics/sidebar-width',
      positionTiddler: '$:/themes/nico/notebook/metrics/sidebar-position'
    };

    // theme: whitespace
    this.whitespace = {
      name: 'WHITESPACE',
      theme: '$:/themes/jd/Whitespace',
      positionTiddler: '$:/config/Whitespace/sidebar',
      widthTiddler: this.defaultWidthTiddler
    };

    this.sidebarLayoutTiddler =
      '$:/themes/tiddlywiki/vanilla/options/sidebarlayout';

    // listen tiddlers
    this.listenTiddlers = [
      this.notebook.positionTiddler,
      '$:/language',
      '$:/layout',
      this.themeTiddler,
      this.whitespace.positionTiddler,
      this.sidebarLayoutTiddler
    ];
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    // this.checker();
    // update theme
    const theme = this.checkTheme();
    this.theme = theme;
    // after update this.theme
    this.presetForVanillaTheme();

    // NOTE: Tailwindcss class here, if you dont want install the extra tailwindcss dependency, you can rewrite it use general style()
    const resizer = createElement('div', {
      class: 'oresizer'
    });

    if (this.getSidebarPosition() === this.LEFT) {
      resizer.classList.add('oresizer-right');
    } else {
      resizer.classList.add('oresizer-left');
    }

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault(); // prevent select text on move sidebar width

      this.isResizing = true;
      document.addEventListener('pointermove', (e) => this.resize(e));
      document.addEventListener('pointerup', (e) => this.stopResize(e));
    });

    parent.insertBefore(resizer, nextSibling);
    this.domNodes.push(resizer);
  }

  checkTheme() {
    // TODO: 或许可以借助split 获取主题
    const theme = this.getText(this.themeTiddler);

    if (this.notebook.theme.includes(theme)) {
      return this.notebook.name;
    }

    // 或许可以做一个映射
    switch (theme) {
      case this.whitespace.theme:
        return this.whitespace.name;
      default:
        return this.VANILLA;
    }
  }

  presetForVanillaTheme() {
    const sidebarLayout = this.getText(this.sidebarLayoutTiddler);

    if (this.theme === this.VANILLA) {
      if (sidebarLayout !== 'fluid-fixed') {
        console.warn('you should set sidebar layout to fluid-fixed');
        $tw.wiki.setText(this.sidebarLayoutTiddler, null, null, 'fluid-fixed');
      }
    }
  }

  getText(tiddler) {
    return $tw.wiki.getTiddlerText(tiddler);
  }

  getSidebarPosition() {
    // NOTE: before vanilla adjust
    if (this.getText(this.themeTiddler) === '$:/themes/cdr/captivate') {
      return this.LEFT;
    }

    switch (this.theme) {
      case this.whitespace.name:
        if (!$tw.wiki.tiddlerExists(this.whitespace.positionTiddler)) {
          return this.LEFT;
        }
        return this.getText(this.whitespace.positionTiddler);

      case this.notebook.name:
        if (!$tw.wiki.tiddlerExists(this.notebook.positionTiddler)) {
          return this.LEFT;
        }

        const { position = this.LEFT } = $tw.wiki.getTiddler(
          this.notebook.positionTiddler
        ).fields;

        return position;

      default:
        return this.RIGHT;
    }
  }

  getDefaultSidebarWidth() {
    return this.getText(this.nbWidthTiddler).replace('px', '');
  }

  resize(e) {
    const clientX = e.clientX;
    if (this.isResizing) {
      if (this.getSidebarPosition() === this.LEFT) {
        this.width = clientX;
      } else {
        this.width = window.innerWidth - clientX;
      }
      if (this.width / window.innerWidth > 0.5) {
        return;
      }
      if (this.width / window.innerWidth < 0.05) {
        this.closeSidebar();
        this.isResizing = false;
        return;
      }
      this.updateSidebarWidth(this.width);
    }
  }

  stopResize(e) {
    this.isResizing = false;
    // 监听事件的this 指向全局window, 如果希望指向当前 class 的this , 可以使用箭头函数, 或者手动修改this 指向
    document.removeEventListener('pointermove', (e) => this.resize(e));
  }

  closeSidebar() {
    const stateTiddler =
      this.theme === this.notebook.name
        ? this.notebook.stateTiddler
        : this.defaultStateTiddler;
    $tw.wiki.setText(stateTiddler, 'text', null, 'no');
    this.updateSidebarWidth(this.getDefaultSidebarWidth());
  }

  updateSidebarWidth(width) {
    const targetTiddler =
      this.theme === this.notebook.name
        ? this.notebook.widthTiddler
        : this.defaultWidthTiddler;
    requestAnimationFrame(() => {
      $tw.wiki.setText(
        targetTiddler,
        null,
        null,
        `${Number(width).toFixed(0)}px`,
        {
          suppressTimestamp: true // not work???
        }
      );
    });
  }

  checker() {
    const logger = new $tw.utils.Logger(en.pluginname);
    if (!$tw.modules.titles['tailwindcss.min.js']) {
      logger.alert(en.warning);
    }
  }

  shouldRefresh(changedTiddlers, tiddlerList) {
    const changedKeys = Object.keys(changedTiddlers);
    return tiddlerList.some((tiddler) => changedKeys.includes(tiddler));
  }

  refresh(changedTiddlers) {
    // TODO: refresh on change tw languages
    if (this.shouldRefresh(changedTiddlers, this.listenTiddlers)) {
      this.refreshSelf();
      console.warn('refresh', new Date());
      return true;
    }
    return false;
  }
}

exports.nbresizer = NotebookResizer;
