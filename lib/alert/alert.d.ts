import '../dialog/dialog';
import { PolymerElement } from '@polymer/polymer/polymer-element';
/**
 * Implments asynchronous alert message.
 */
export declare class DopeAlert extends PolymerElement {
    static readonly template: HTMLTemplateElement;
    /**
     * Shows alert message, returns promise that is resolved once user has clicked the "OK" button.
     *
     * @param message Alert message to show
     * @param caption Optional alert caption.
     */
    static show(message: string, caption?: string): Promise<void>;
    /**
     * Caption of the dialog.
     */
    caption?: string;
    /**
     * Alert message.
     */
    message?: string;
    onOkClick(): void;
}
