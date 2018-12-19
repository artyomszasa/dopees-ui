import '../dialog/dialog';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mkTemplate } from '../templates';
import { property, customElement } from '@polymer/decorators/lib/decorators';
import dom from '../dom';
import view from './alert.pug';

/**
 * Implments asynchronous alert message.
 */
@customElement('dope-alert')
export class DopeAlert extends PolymerElement {
  static get template() { return mkTemplate(view); }

  /**
   * Shows alert message, returns promise that is resolved once user has clicked the "OK" button.
   *
   * @param message Alert message to show
   * @param caption Optional alert caption.
   */
  static show(message: string, caption?: string): Promise<void> {
    return new Promise(resolve => {
      const dialog = <DopeAlert>document.createElement('dope-alert');
      dom.body.appendChild(dialog);
      dialog.message = message;
      dialog.caption = caption || 'Üzenet';
      dialog.addEventListener('dope-ok', () => {
        dialog.remove();
        resolve();
      })
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

  onOkClick() {
    this.dispatchEvent(new CustomEvent('dope-ok'));
  }
}