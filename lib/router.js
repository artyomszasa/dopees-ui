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
const DopeRouterMixin = Object.assign(dedupingMixin(base => {
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
            DopeRouterMixin.attachLinkHandlers(this.shadowRoot);
            // oldalváltás lekezelése.
            this.shadowRoot.addEventListener('goto-page', e => {
                e.preventDefault();
                e.stopPropagation();
                this.initPage(e.detail.page, false, !!e.detail.replace);
            }, true);
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
                    const pageElement = this.shadowRoot.querySelector(page.component);
                    if (pageElement) {
                        this.__previousPage = pageElement;
                        pageElement.trigger('init', { detail: this.currentPage.arguments || {} });
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
}), {
    attachLinkHandlers: root => {
        root.addEventListener('click', (e) => {
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
});
export const DopeGotoMixin = dedupingMixin(base => class extends base {
    ready() {
        super.ready();
        DopeRouterMixin.attachLinkHandlers(this.shadowRoot);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVcxRCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNuQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDbkIsTUFBZSxVQUFXLFNBQVEsSUFBSTtRQUF0Qzs7WUFDRSxxQkFBZ0IsR0FBb0IsRUFBRSxDQUFDO1FBd0Z6QyxDQUFDO1FBaEZDLElBQUksZ0JBQWdCLEtBQU0sT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxnQkFBZ0IsS0FBTSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsS0FBSztZQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLHlCQUF5QjtZQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNWLG1DQUFtQztZQUNuQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxXQUFXLEdBQUc7Z0JBQ2hCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJ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