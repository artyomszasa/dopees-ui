import '@polymer/polymer/lib/elements/dom-if';
import { PolymerElement } from '@polymer/polymer/polymer-element';
/**
 * Provides dialog skeleton with slottable body and buttons sections.
 */
export declare class DopeDialog extends PolymerElement {
    static get template(): HTMLTemplateElement;
    /**
     * Caption of the dialog.
     */
    caption?: string;
}
