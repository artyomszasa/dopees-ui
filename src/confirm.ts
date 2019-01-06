import './dialog/dialog';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mkTemplate } from './templates';
import { property, customElement } from '@polymer/decorators/lib/decorators';
import dom from './dom';
import view from './confirm/confirm.pug';

export interface DopeConfirmInit {
  caption?: string;
  confirmButtonLabel?: string,
  cancelButtonLabel?: string
}

/**
 * Implments asynchronous confirmation dialog.
 */
@customElement('dope-confirm')
export class DopeConfirm extends PolymerElement {
  static get template() { return mkTemplate(view); }

  /**
   * Shows confirmation dialog, returns promise that is resolved if user has clicked the confirm button, or rejected if
   * user has clicked the cancel button.
   *
   * @param message Confirmation message to show.
   * @param caption Optional alert caption.
   */
  static show(message: string, caption?: DopeConfirmInit|string): Promise<void> {
    return new Promise((resolve, reject) => {
      const dialog = <DopeConfirm>document.createElement('dope-confirm');
      dom.body.appendChild(dialog);
      dialog.message = message;
      if (caption) {
        if ('string' === typeof caption) {
          dialog.caption = caption;
        } else {
          dialog.caption = caption.caption || 'Megerősítés';
          if (caption.confirmButtonLabel) {
            dialog.confirmButtonLabel = caption.confirmButtonLabel;
          }
          if (caption.cancelButtonLabel) {
            dialog.cancelButtonLabel = caption.cancelButtonLabel;
          }
        }
      } else {
        dialog.caption = 'Megerősítés';
      }
      dialog.addEventListener('dope-ok', () => {
        dialog.remove();
        resolve();
      }, false);
      dialog.addEventListener('dope-cancel', () => {
        dialog.remove();
        reject('cancelled');
      }, false)
    });
  }

  /**
   * Caption of the dialog.
   */
  @property({ type: String })
  caption?: string

  /**
   * Alert message.
   */
  @property({ type: String })
  message?: string

  @property({ type: String })
  confirmButtonLabel: string = 'Megerősítés';

  @property({ type: String })
  cancelButtonLabel: string = 'Mégsem';

  onOkClick() {
    this.dispatchEvent(new CustomEvent('dope-ok'));
  }

  onCancelClick() {
    this.dispatchEvent(new CustomEvent('dope-cancel'));
  }
}