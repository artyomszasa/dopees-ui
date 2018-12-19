import '@polymer/polymer/lib/elements/dom-if';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { customElement, property } from '@polymer/decorators/lib/decorators';
import { mkTemplate } from '../templates';
import view from './dialog.pug';

/**
 * Provides dialog skeleton with slottable body and buttons sections.
 */
@customElement('dope-dialog')
export class DopeDialog extends PolymerElement {
  static get template() { return mkTemplate(view); }

  /**
   * Caption of the dialog.
   */
  @property({ type: String })
  caption?: string;
}