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

          if (!e.detail) {
            this.initPage({
              component: this.defaultComponent,
              arguments: this.defaultArguments
            }, false, false);
          } else {
            this.initPage(e.detail.page, false, !!e.detail.replace);
          }
        }, true);
      }

      this.initPage(initialPage, false, true);
    }

    async initPage(page, isPop, replace) {
      if (!page) {
        throw new Error('page not specified in initPage.');
      }

      let confirmLeave = true;

      if (this.__previousPage && this.__previousPage.beforeLeave) {
        try {
          confirmLeave = await Promise.resolve(this.__previousPage.beforeLeave());
        } catch (e) {
          console.warn(e);
          confirmLeave = false;
        }
      }

      if (confirmLeave) {
        let loaded;

        try {
          await this._loadComponent(page.component);
          loaded = true;
        } catch (e) {
          console.warn(e);
          loaded = false;
        }

        if (!loaded) {
          this.notFound = true;
        } else {
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
        }
      } else {
        // restore state somehow o_O
        const uri = new Uri('');
        uri.path = '/' + this.currentPage.component.replace('-', '/');
        uri.queryParams = this.currentPage.arguments || {};
        window.history.pushState(this.currentPage, '', uri.href);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VCxDQUFBLEUsb0JBQUEsRSxhQUFBLEUsS0FBdUIsQ0FBdkIsQ0FBQTs7QUEyR0Q7QUFDRCxTQUFzQyxVQUF0QztBQUNELENBdEgyQyxDQUFyQztBQXdIUCxPQUFPLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBNEIsSUFBM0IsSUFBc0QsY0FBcUMsSUFBckMsQ0FBMEM7QUFDekksRUFBQSxLQUFLLEdBQUE7QUFDRCxVQUFNLEtBQU47O0FBQ0EsUUFBSSxLQUFLLFVBQVQsRUFBcUI7QUFDbkIsTUFBQSxVQUFVLENBQUMsa0JBQVgsQ0FBOEIsS0FBSyxVQUFuQztBQUNEO0FBQ0o7O0FBTndJLENBQWpHLENBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVkdXBpbmdNaXhpbiB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvbGliL3V0aWxzL21peGluJztcbmltcG9ydCB7IHByb3BlcnR5IH0gZnJvbSAnQHBvbHltZXIvZGVjb3JhdG9ycy9saWIvZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBVcmkgfSBmcm9tICdkb3BlZXMtY29yZS9saWIvdXJpJztcbmltcG9ydCB7IGZyb21CYXNlNjRTdHJpbmcgfSBmcm9tICdkb3BlZXMtY29yZS9saWIvc3RyaW5nJztcbmltcG9ydCB7IFBvbHltZXJFbGVtZW50IH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9wb2x5bWVyLWVsZW1lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VEYXRhIHtcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIGFyZ3VtZW50czogYW55O1xufVxuXG5pbnRlcmZhY2UgUGFnZURhdGFBcmdzIHtcbiAgcGFnZTogUGFnZURhdGE7XG4gIHJlcGxhY2U/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgTmFtZWRQcm9taXNlTWFwIHtcbiAgW2tleTogc3RyaW5nXTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmluZ01hcCB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3BlUm91dGVyIHtcbiAgbm90Rm91bmQ6IGJvb2xlYW47XG4gIGN1cnJlbnRQYWdlOiBQYWdlRGF0YTtcbiAgZGVmYXVsdENvbXBvbmVudDogc3RyaW5nO1xuICBkZWZhdWx0QXJndW1lbnRzPzogU3RyaW5nTWFwO1xuICBpbml0UGFnZShwYWdlOiBQYWdlRGF0YSwgaXNQb3A/OiBib29sZWFuLCByZXBsYWNlPzogYm9vbGVhbik6IHZvaWQ7XG4gIF9jdXJyZW50UGFnZUNoYW5nZWQocGFnZTogUGFnZURhdGEpOiB2b2lkO1xuICBfcmVzb2x2ZUNvbXBvbmVudFBhdGgoY29tcG9uZW50OiBzdHJpbmcpOiBzdHJpbmc7XG4gIF9sb2FkQ29tcG9uZW50IChjb21wb25lbnQ6IHN0cmluZyk6IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBEb3BlUm91dGVyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaExpbmtIYW5kbGVycyhyb290OiBOb2RlKSB7XG4gICAgcm9vdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChleDogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGUgPSA8TW91c2VFdmVudD5leDtcbiAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0OiBFbGVtZW50fHVuZGVmaW5lZHxudWxsID0gZS50YXJnZXQ7XG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWUgIT09ICdBJyAmJiAhKHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJykpKSB7XG4gICAgICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnc3VwcHJlc3MtZ290bycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCA/IHRhcmdldC5wYXJlbnROb2RlIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSAmJiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnc3VwcHJlc3MtZ290bycpIHx8IHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXdQYWdlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJyk7XG4gICAgICAgIGlmICghcmF3UGFnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSA8UGFnZURhdGE+SlNPTi5wYXJzZShmcm9tQmFzZTY0U3RyaW5nKHJhd1BhZ2UpKTtcbiAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdnb3RvLXBhZ2UnLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBzb3VyY2U6IHRhcmdldFxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sIHRydWUpXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdG9yPFQ+IHtcbiAgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQ7XG59XG5cbmV4cG9ydCBjb25zdCBEb3BlUm91dGVyTWl4aW4gPSBkZWR1cGluZ01peGluKDxUIGV4dGVuZHMgUG9seW1lckVsZW1lbnQ+KGJhc2U6IEN0b3I8VD4pID0+IHtcbiAgYWJzdHJhY3QgY2xhc3MgRG9wZVJvdXRlZCBleHRlbmRzICg8Q3RvcjxQb2x5bWVyRWxlbWVudD4+YmFzZSkge1xuICAgIF9fcGFnZUNvbXBvbmVudHM6IE5hbWVkUHJvbWlzZU1hcCA9IHt9O1xuICAgIF9fcHJldmlvdXNQYWdlOiBhbnk7IC8vRklYTUU6IHR5cGluZ1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgbm90aWZ5OiB0cnVlLCByZWZsZWN0VG9BdHRyaWJ1dGU6IHRydWUgfSlcbiAgICBub3RGb3VuZCE6IGJvb2xlYW47XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBPYmplY3QsIG5vdGlmeTogdHJ1ZSwgb2JzZXJ2ZXI6ICdfY3VycmVudFBhZ2VDaGFuZ2VkJyB9KVxuICAgIGN1cnJlbnRQYWdlITogUGFnZURhdGE7XG5cbiAgICBnZXQgZGVmYXVsdENvbXBvbmVudCAoKSB7IHJldHVybiAnYWRtaW4tZGFzaGJvYXJkJzsgfVxuXG4gICAgZ2V0IGRlZmF1bHRBcmd1bWVudHMgKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG5cbiAgICByZWFkeSAoKSB7XG4gICAgICAgIHN1cGVyLnJlYWR5KCk7XG4gICAgICAgIC8vIHZpc3N6YSBnb21iIGxla2V6ZWzDqXNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKGUuc3RhdGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIC8vIGtlemRlaSDDoWxsYXBvdCBraWx2YXPDoXNhIHVybC1ixZFsXG4gICAgICAgIGNvbnN0IHVyaSA9IFVyaS5mcm9tKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFBhZ2UgPSB7XG4gICAgICAgICAgY29tcG9uZW50OiAodXJpLnBhdGguc3Vic3RyaW5nKDEpLnJlcGxhY2UoJy8nLCAnLScpIHx8IHRoaXMuZGVmYXVsdENvbXBvbmVudCksXG4gICAgICAgICAgYXJndW1lbnRzOiAodXJpLnBhdGguc3Vic3RyaW5nKDEpLnJlcGxhY2UoJy8nLCAnLScpID8gdXJpLnF1ZXJ5UGFyYW1zIDogdGhpcy5kZWZhdWx0QXJndW1lbnRzKVxuICAgICAgICB9O1xuICAgICAgICAvLyBrw7xsc8WRIGxheW91dC1iYW4gbMOpdsWRIGxpbmtlayBsZWtlemVsw6lzZS5cbiAgICAgICAgaWYgKHRoaXMuc2hhZG93Um9vdCkge1xuICAgICAgICAgIERvcGVSb3V0ZXIuYXR0YWNoTGlua0hhbmRsZXJzKHRoaXMuc2hhZG93Um9vdCk7XG4gICAgICAgICAgLy8gb2xkYWx2w6FsdMOhcyBsZWtlemVsw6lzZS5cbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignZ290by1wYWdlJywgZXggPT4ge1xuICAgICAgICAgICAgY29uc3QgZSA9IDxDdXN0b21FdmVudDxQYWdlRGF0YUFyZ3N8bnVsbD4+ZXg7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgaWYgKCFlLmRldGFpbCkge1xuICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKHsgY29tcG9uZW50OiB0aGlzLmRlZmF1bHRDb21wb25lbnQsIGFyZ3VtZW50czogdGhpcy5kZWZhdWx0QXJndW1lbnRzIH0sIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKGUuZGV0YWlsLnBhZ2UsIGZhbHNlLCAhIWUuZGV0YWlsLnJlcGxhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoaW5pdGlhbFBhZ2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gICAgYXN5bmMgaW5pdFBhZ2UgKHBhZ2U6IFBhZ2VEYXRhLCBpc1BvcD86IGJvb2xlYW4sIHJlcGxhY2U/OiBib29sZWFuKSB7XG4gICAgICBpZiAoIXBhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYWdlIG5vdCBzcGVjaWZpZWQgaW4gaW5pdFBhZ2UuJyk7XG4gICAgICB9XG4gICAgICBsZXQgY29uZmlybUxlYXZlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLl9fcHJldmlvdXNQYWdlICYmIHRoaXMuX19wcmV2aW91c1BhZ2UuYmVmb3JlTGVhdmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25maXJtTGVhdmUgPSBhd2FpdCBQcm9taXNlLnJlc29sdmU8Ym9vbGVhbj4odGhpcy5fX3ByZXZpb3VzUGFnZS5iZWZvcmVMZWF2ZSgpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgICBjb25maXJtTGVhdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbmZpcm1MZWF2ZSkge1xuICAgICAgICBsZXQgbG9hZGVkOiBib29sZWFuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX2xvYWRDb21wb25lbnQocGFnZS5jb21wb25lbnQpO1xuICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgICAgICAgbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgICAgICB0aGlzLm5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCFpc1BvcCkge1xuICAgICAgICAgICAgY29uc3QgdXJpID0gbmV3IFVyaSgnJyk7XG4gICAgICAgICAgICB1cmkucGF0aCA9ICcvJyArIHBhZ2UuY29tcG9uZW50LnJlcGxhY2UoJy0nLCAnLycpO1xuICAgICAgICAgICAgdXJpLnF1ZXJ5UGFyYW1zID0gcGFnZS5hcmd1bWVudHMgfHwge307XG4gICAgICAgICAgICBpZiAocmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShwYWdlLCAnJywgdXJpLmhyZWYpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUocGFnZSwgJycsIHVyaS5ocmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlc3RvcmUgc3RhdGUgc29tZWhvdyBvX09cbiAgICAgICAgY29uc3QgdXJpID0gbmV3IFVyaSgnJyk7XG4gICAgICAgIHVyaS5wYXRoID0gJy8nICsgdGhpcy5jdXJyZW50UGFnZS5jb21wb25lbnQucmVwbGFjZSgnLScsICcvJyk7XG4gICAgICAgIHVyaS5xdWVyeVBhcmFtcyA9IHRoaXMuY3VycmVudFBhZ2UuYXJndW1lbnRzIHx8IHt9O1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUodGhpcy5jdXJyZW50UGFnZSwgJycsIHVyaS5ocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX2N1cnJlbnRQYWdlQ2hhbmdlZCAocGFnZTogUGFnZURhdGEpIHtcbiAgICAgIGlmICghdGhpcy5ub3RGb3VuZCkge1xuICAgICAgICAvLyB3YWl0IGZvciBkb20taWYgdG8gYXBwbHkgY2hhbmdlc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fX3ByZXZpb3VzUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5fX3ByZXZpb3VzUGFnZS5sZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwYWdlRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCAmJiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihwYWdlLmNvbXBvbmVudCk7XG4gICAgICAgICAgaWYgKHBhZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9fcHJldmlvdXNQYWdlID0gcGFnZUVsZW1lbnQ7XG4gICAgICAgICAgICBwYWdlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaW5pdCcsIHsgZGV0YWlsIDogdGhpcy5jdXJyZW50UGFnZS5hcmd1bWVudHMgfHwgeyB9IH0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3RGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWJzdHJhY3QgX3Jlc29sdmVDb21wb25lbnRQYXRoKGNvbXBvbmVudDogc3RyaW5nKTogc3RyaW5nO1xuICAgIF9sb2FkQ29tcG9uZW50IChjb21wb25lbnQ6IHN0cmluZykge1xuICAgICAgaWYgKCF0aGlzLl9fcGFnZUNvbXBvbmVudHNbY29tcG9uZW50XSkge1xuICAgICAgICB0aGlzLl9fcGFnZUNvbXBvbmVudHNbY29tcG9uZW50XSA9IGltcG9ydCh0aGlzLl9yZXNvbHZlQ29tcG9uZW50UGF0aChjb21wb25lbnQpKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9fcGFnZUNvbXBvbmVudHNbY29tcG9uZW50XTtcbiAgICB9XG4gIH07XG4gIHJldHVybiA8Q3RvcjxUICYgRG9wZVJvdXRlcj4+PHVua25vd24+RG9wZVJvdXRlZDtcbn0pO1xuXG5leHBvcnQgY29uc3QgRG9wZUdvdG9NaXhpbiA9IGRlZHVwaW5nTWl4aW4oPFQgZXh0ZW5kcyBQb2x5bWVyRWxlbWVudD4oYmFzZTogQ3RvcjxUPikgPT4gPEN0b3I8VD4+Y2xhc3MgZXh0ZW5kcyAoPEN0b3I8UG9seW1lckVsZW1lbnQ+PmJhc2UpIHtcbiAgcmVhZHkgKCkge1xuICAgICAgc3VwZXIucmVhZHkoKTtcbiAgICAgIGlmICh0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgRG9wZVJvdXRlci5hdHRhY2hMaW5rSGFuZGxlcnModGhpcy5zaGFkb3dSb290KTtcbiAgICAgIH1cbiAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==