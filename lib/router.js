var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";
import { property } from "@polymer/decorators/lib/decorators.js";
import { Uri } from "dopees-core/lib/uri.js";
import { fromBase64String } from "dopees-core/lib/string.js";
export var DopeRouter;

(function (DopeRouter) {
  function attachLinkHandlers(root) {
    root.addEventListener('click', ex => {
      const e = ex;

      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.target instanceof Element) {
        let target = e.target;

        while (target && target.tagName !== 'A' && !(target.getAttribute && target.getAttribute('data-page'))) {
          if (target.hasAttribute && target.hasAttribute('suppress-goto')) {
            return;
          }

          target = target.parentNode instanceof Element ? target.parentNode : null;
        }

        if (!target) {
          return;
        }

        if (target.hasAttribute && (target.hasAttribute('suppress-goto') || target.hasAttribute('draggable'))) {
          return;
        }

        const rawPage = target.getAttribute('data-page');

        if (!rawPage) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        const page = JSON.parse(fromBase64String(rawPage));
        target.dispatchEvent(new CustomEvent('goto-page', {
          bubbles: true,
          composed: true,
          detail: {
            page,
            source: target
          }
        }));
      }
    }, true);
  }

  DopeRouter.attachLinkHandlers = attachLinkHandlers;
})(DopeRouter || (DopeRouter = {}));

export const DopeRouterMixin = dedupingMixin(base => {
  class DopeRouted extends base {
    constructor() {
      super(...arguments);
      this.__pageComponents = {};
    }

    get defaultComponent() {
      return 'admin-dashboard';
    }

    get defaultArguments() {
      return undefined;
    }

    ready() {
      super.ready(); // vissza gomb lekezelése

      window.addEventListener('popstate', e => {
        if (e.state) {
          this.initPage(e.state, true);
        }
      }, false); // kezdei állapot kilvasása url-ből

      const uri = Uri.from(window.location.href);
      const initialPage = {
        component: uri.path.substring(1).replace('/', '-') || this.defaultComponent,
        arguments: uri.path.substring(1).replace('/', '-') ? uri.queryParams : this.defaultArguments
      }; // külső layout-ban lévő linkek lekezelése.

      if (this.shadowRoot) {
        DopeRouter.attachLinkHandlers(this.shadowRoot); // oldalváltás lekezelése.

        this.shadowRoot.addEventListener('goto-page', ex => {
          const e = ex;
          e.preventDefault();
          e.stopPropagation();
          this.initPage(e.detail.page, false, !!e.detail.replace);
        }, true);
      }

      this.initPage(initialPage, false, true);
    }

    initPage(page, isPop, replace) {
      if (!page) {
        throw new Error('page not specified in initPage.');
      }

      let confirmLeave = Promise.resolve();

      if (this.__previousPage && this.__previousPage.beforeLeave) {
        confirmLeave = Promise.resolve(this.__previousPage.beforeLeave()); // dope.confirm('Az aktuális oldal tartalmaz nem mentett változást...', 'Biztosan vált oldalt?');
      }

      confirmLeave.then(() => {
        return this._loadComponent(page.component).then(null, () => this.notFound = true).then(() => {
          this.notFound = false;

          if (!isPop) {
            const uri = new Uri('');
            uri.path = '/' + page.component.replace('-', '/');
            uri.queryParams = page.arguments || {};

            if (replace) {
              window.history.replaceState(page, '', uri.href);
            } else {
              window.history.pushState(page, '', uri.href);
            }
          }

          this.currentPage = page;
        });
      }, () => {});
    }

    _currentPageChanged(page) {
      if (!this.notFound) {
        // wait for dom-if to apply changes
        setTimeout(() => {
          if (this.__previousPage) {
            this.__previousPage.leave();
          }

          const pageElement = this.shadowRoot && this.shadowRoot.querySelector(page.component);

          if (pageElement) {
            this.__previousPage = pageElement;
            pageElement.dispatchEvent(new CustomEvent('init', {
              detail: this.currentPage.arguments || {}
            }));
          } else {
            this.notFound = true;
          }
        }, 0);
      }
    }

    _loadComponent(component) {
      if (!this.__pageComponents[component]) {
        this.__pageComponents[component] = import(this._resolveComponentPath(component)).catch(() => null);
      }

      return this.__pageComponents[component];
    }

  }

  __decorate([property({
    type: Boolean,
    notify: true,
    reflectToAttribute: true
  })], DopeRouted.prototype, "notFound", void 0);

  __decorate([property({
    type: Object,
    notify: true,
    observer: '_currentPageChanged'
  })], DopeRouted.prototype, "currentPage", void 0);

  ;
  return DopeRouted;
});
export const DopeGotoMixin = dedupingMixin(base => class extends base {
  ready() {
    super.ready();

    if (this.shadowRoot) {
      DopeRouter.attachLinkHandlers(this.shadowRoot);
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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