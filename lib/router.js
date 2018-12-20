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
var DopeRouter;

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
    DopeRouter.attachLinkHandlers(this.shadowRoot);
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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