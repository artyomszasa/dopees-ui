import { PolymerElement } from "@polymer/polymer/polymer-element";
export interface DopePromptInit {
    label: string;
    caption?: string;
    hint?: string;
    value?: string;
}
export declare class DopePrompt extends PolymerElement {
    static readonly template: HTMLTemplateElement;
    static show(label: string, caption?: string, hint?: string, value?: string): Promise<string>;
    static show(init: DopePromptInit): Promise<string>;
    caption: string;
    label?: string;
    hint?: string;
    value?: string;
    onOk(): void;
}
