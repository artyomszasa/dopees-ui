export declare class DopeMaterialIcon extends HTMLElement {
    static readonly observedAttributes: string[];
    private iconType?;
    icon?: SVGSVGElement;
    private removeSvg;
    private updateSvg;
    attributeChangedCallback(name: string, _?: string, newValue?: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
