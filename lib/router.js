var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
import { property } from '@polymer/decorators/lib/decorators';
import { Uri } from 'dopees-core/lib/uri';
import { fromBase64String } from 'dopees-core/lib/string';
var DopeRouter;
(function (DopeRouter) {
    function attachLinkHandlers(root) {
        root.addEventListener('click', (ex) => {
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
export const DopeRouterMixin = dedupingMixin((base) => {
    class DopeRouted extends base {
        constructor() {
            super(...arguments);
            this.__pageComponents = {};
        }
        get defaultComponent() { return 'admin-dashboard'; }
        get defaultArguments() { return undefined; }
        ready() {
            super.ready();
            // vissza gomb lekezelése
            window.addEventListener('popstate', e => {
                if (e.state) {
                    this.initPage(e.state, true);
                }
            }, false);
            // kezdei állapot kilvasása url-ből
            const uri = Uri.from(window.location.href);
            const initialPage = {
                component: (uri.path.substring(1).replace('/', '-') || this.defaultComponent),
                arguments: (uri.path.substring(1).replace('/', '-') ? uri.queryParams : this.defaultArguments)
            };
            // külső layout-ban lévő linkek lekezelése.
            if (this.shadowRoot) {
                DopeRouter.attachLinkHandlers(this.shadowRoot);
                // oldalváltás lekezelése.
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
                return this._loadComponent(page.component)
                    .then(null, () => this.notFound = true)
                    .then(() => {
                    this.notFound = false;
                    if (!isPop) {
                        const uri = new Uri('');
                        uri.path = '/' + page.component.replace('-', '/');
                        uri.queryParams = page.arguments || {};
                        if (replace) {
                            window.history.replaceState(page, '', uri.href);
                        }
                        else {
                            window.history.pushState(page, '', uri.href);
                        }
                    }
                    this.currentPage = page;
                });
            }, () => { });
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
                        pageElement.dispatchEvent(new CustomEvent('init', { detail: this.currentPage.arguments || {} }));
                    }
                    else {
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
    __decorate([
        property({ type: Boolean, notify: true, reflectToAttribute: true })
    ], DopeRouted.prototype, "notFound", void 0);
    __decorate([
        property({ type: Object, notify: true, observer: '_currentPageChanged' })
    ], DopeRouted.prototype, "currentPage", void 0);
    ;
    return DopeRouted;
});
export const DopeGotoMixin = dedupingMixin(base => class extends base {
    ready() {
        super.ready();
        DopeRouter.attachLinkHandlers(this.shadowRoot);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWdDMUQsSUFBVSxVQUFVLENBdUNuQjtBQXZDRCxXQUFVLFVBQVU7SUFDbEIsU0FBZ0Isa0JBQWtCLENBQUMsSUFBVTtRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBUyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxDQUFDLEdBQWUsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hDLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxPQUFPLEVBQUU7Z0JBQy9CLElBQUksTUFBTSxHQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUM5QyxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JHLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUMvRCxPQUFPO3FCQUNSO29CQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENB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