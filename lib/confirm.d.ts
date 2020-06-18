import './dialog/dialog';
import { PolymerElement } from '@polymer/polymer/polymer-element';
export interface DopeConfirmInit {
    caption?: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}
/**
 * Implments asynchronous confirmation dialog.
 */
export declare class DopeConfirm extends PolymerElement {
    static get template(): HTMLTemplateElement;
    /**
     * Shows confirmation dialog, returns promise that is resolved if user has clicked the confirm button, or rejected if
     * user has clicked the cancel button.
     *
     * @param message Confirmation message to show.
     * @param caption Optional alert caption.
     */
    static show(message: string, caption?: DopeConfirmInit | string): Promise<void>;
    /**
     * Caption of the dialog.
     */
    caption?: string;
    /**
     * Alert message.
     */
    message?: string;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
    onOkClick(): void;
    onCancelClick(): void;
}
