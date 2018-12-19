import { PolymerElement } from '@polymer/polymer/polymer-element';
export interface PageData {
    component: string;
    arguments: any;
}
export interface StringMap {
    [key: string]: string;
}
interface DopeRouter {
    notFound: boolean;
    currentPage: PageData;
    defaultComponent: string;
    defaultArguments?: StringMap;
    initPage(page: PageData, isPop?: boolean, replace?: boolean): void;
    _currentPageChanged(page: PageData): void;
    _resolveComponentPath(component: string): string;
    _loadComponent(component: string): Promise<any>;
}
declare namespace DopeRouter {
    function attachLinkHandlers(root: Node): void;
}
interface Ctor<T> {
    new (...args: any[]): T;
}
export declare const DopeRouterMixin: <T extends PolymerElement>(base: Ctor<T>) => Ctor<T & DopeRouter>;
export declare const DopeGotoMixin: (base: any) => {
    new (): {
        [x: string]: any;
        ready(): void;
    };
    [x: string]: any;
};
export {};
