import { PolymerElement } from "@polymer/polymer/polymer-element";
import { customElement, property } from "@polymer/decorators/lib/decorators";
import dom from "./dom";
import { mkTemplate } from "./templates";
import view from './prompt/prompt.pug';

export interface DopePromptInit {
  label: string;
  caption?: string;
  hint?: string;
  value?: string;
}

@customElement('dope-prompt')
export class DopePrompt extends PolymerElement {
  static get template() { return mkTemplate(view); }

  static show(label: string, caption?: string, hint?: string, value?: string): Promise<string>;
  static show(init: DopePromptInit): Promise<string>;
  static show(init: string|DopePromptInit, caption?: string, hint?: string, value?: string): Promise<string> {
    let opts: DopePromptInit;
    if ('string' === typeof init) {
      opts = {
        label: init,
        caption: caption,
        hint: hint,
        value: value
      }
    } else {
      opts = init;
    }
    return new Promise((resolve) => {
      const dialog = <DopePrompt> document.createElement('dope-prompt');
      dom.body.appendChild(dialog);
      dialog.label = opts.label;
      dialog.hint = opts.hint;
      dialog.caption = opts.caption || 'Üzenet';
      dialog.value = opts.value;
      dialog.addEventListener('dope-ok', () => {
        dom.remove(dialog);
        resolve(dialog.value);
      }, false);
    });
  }

  @property({ type: String })
  caption: string = 'Üzenet';

  @property({ type: String })
  label?: string;

  @property({ type: String })
  hint?: string;

  @property({ type: String })
  value?: string;

  onOk () {
    this.dispatchEvent(new CustomEvent<String>('dope-ok', {
      detail: this.value
    }));
  }
}
