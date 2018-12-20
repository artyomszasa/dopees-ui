import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
import { property } from '@polymer/decorators/lib/decorators';
import { Uri } from 'dopees-core/lib/uri';
import { fromBase64String } from 'dopees-core/lib/string';
import { PolymerElement } from '@polymer/polymer/polymer-element';

export interface PageData {
  component: string;
  arguments: any;
}

interface PageDataArgs {
  page: PageData;
  replace?: boolean;
}

interface NamedPromiseMap {
  [key: string]: Promise<any>;
}

export interface StringMap {
  [key: string]: string;
}

export interface DopeRouter {
  notFound: boolean;
  currentPage: PageData;
  defaultComponent: string;
  defaultArguments?: StringMap;
  initPage(page: PageData, isPop?: boolean, replace?: boolean): void;
  _currentPageChanged(page: PageData): void;
  _resolveComponentPath(component: string): string;
  _loadComponent (component: string): Promise<any>;
}

export namespace DopeRouter {
  export function attachLinkHandlers(root: Node) {
    root.addEventListener('click', (ex: Event) => {
      const e = <MouseEvent>ex;
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return;
      }
      if (e.target instanceof Element) {
        let target: Element|undefined|null = e.target;
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
        const page = <PageData>JSON.parse(fromBase64String(rawPage));
        target.dispatchEvent(new CustomEvent('goto-page', {
          bubbles: true,
          composed: true,
          detail: {
            page,
            source: target
          }
        }));
      }
    }, true)
  }
}

export interface Ctor<T> {
  new (...args: any[]): T;
}

export const DopeRouterMixin = dedupingMixin(<T extends PolymerElement>(base: Ctor<T>) => {
  abstract class DopeRouted extends (<Ctor<PolymerElement>>base) {
    __pageComponents: NamedPromiseMap = {};
    __previousPage: any; //FIXME: typing

    @property({ type: Boolean, notify: true, reflectToAttribute: true })
    notFound!: boolean;

    @property({ type: Object, notify: true, observer: '_currentPageChanged' })
    currentPage!: PageData;

    get defaultComponent () { return 'admin-dashboard'; }

    get defaultArguments () { return undefined; }

    ready () {
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
            const e = <CustomEvent<PageDataArgs>>ex;
            e.preventDefault();
            e.stopPropagation();
            this.initPage(e.detail.page, false, !!e.detail.replace);
          }, true);
        }
        this.initPage(initialPage, false, true);
    }
    initPage (page: PageData, isPop?: boolean, replace?: boolean) {
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
                        } else {
                            window.history.pushState(page, '', uri.href);
                        }
                    }
                    this.currentPage = page;
                });
        }, () => {});

    }
    _currentPageChanged (page: PageData) {
      if (!this.notFound) {
        // wait for dom-if to apply changes
        setTimeout(() => {
          if (this.__previousPage) {
            this.__previousPage.leave();
          }
          const pageElement = this.shadowRoot && this.shadowRoot.querySelector(page.component);
          if (pageElement) {
            this.__previousPage = pageElement;
            pageElement.dispatchEvent(new CustomEvent('init', { detail : this.currentPage.arguments || { } }));
          } else {
            this.notFound = true;
          }
        }, 0);
      }
    }
    abstract _resolveComponentPath(component: string): string;
    _loadComponent (component: string) {
      if (!this.__pageComponents[component]) {
        this.__pageComponents[component] = import(this._resolveComponentPath(component)).catch(() => null);
      }
      return this.__pageComponents[component];
    }
  };
  return <Ctor<T & DopeRouter>><unknown>DopeRouted;
});

export const DopeGotoMixin = dedupingMixin(base => class extends base {
  ready () {
      super.ready();
      DopeRouter.attachLinkHandlers(this.shadowRoot);
  }
});