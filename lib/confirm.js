var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import "./dialog/dialog.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mkTemplate } from "./templates.js";
import { property, customElement } from "@polymer/decorators/lib/decorators.js";
import dom from "./dom.js";
const view = "<style>:host{display:block;position:fixed;z-index:9999}dope-dialog{--dialog-width: 20rem}p{margin:0}\n\n/*# sourceMappingURL=confirm.css.map */</style><dope-dialog caption=\"[[caption]]\"><p slot=\"body\">[[message]]</p><div class=\"buttons\" slot=\"buttons\"><dope-button label=\"[[cancelButtonLabel]]\" on-click=\"onCancelClick\"></dope-button><dope-button label=\"[[confirmButtonLabel]]\" on-click=\"onOkClick\"></dope-button></div></dope-dialog>";
/**
 * Implments asynchronous confirmation dialog.
 */

let DopeConfirm = class DopeConfirm extends PolymerElement {
  /**
   * Implments asynchronous confirmation dialog.
   */
  constructor() {
    super(...arguments);
    this.confirmButtonLabel = 'Megerősítés';
    this.cancelButtonLabel = 'Mégsem';
  }

  static get template() {
    return mkTemplate(view);
  }
  /**
   * Shows confirmation dialog, returns promise that is resolved if user has clicked the confirm button, or rejected if
   * user has clicked the cancel button.
   *
   * @param message Confirmation message to show.
   * @param caption Optional alert caption.
   */


  static show(message, caption) {
    return new Promise((resolve, reject) => {
      const dialog = document.createElement('dope-confirm');
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
      }, false);
    });
  }

  onOkClick() {
    this.dispatchEvent(new CustomEvent('dope-ok'));
  }

  onCancelClick() {
    this.dispatchEvent(new CustomEvent('dope-cancel'));
  }

};

__decorate([property({
  type: String
})], DopeConfirm.prototype, "caption", void 0);

__decorate([property({
  type: String
})], DopeConfirm.prototype, "message", void 0);

__decorate([property({
  type: String
})], DopeConfirm.prototype, "confirmButtonLabel", void 0);

__decorate([property({
  type: String
})], DopeConfirm.prototype, "cancelButtonLabel", void 0);

DopeConfirm = __decorate([customElement('dope-confirm')], DopeConfirm);
export { DopeConfirm };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUEzQyxDQUFBOztBQUdBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFFLEVBQUEsSUFBSSxFQUFFO0FBQVIsQ0FBRCxDQUNULENBQUEsRSxxQkFBQSxFLG1CQUFBLEUsS0FBcUMsQ0FBckMsQ0FBQTs7QUF6RFcsV0FBVyxHQUFBLFVBQUEsQ0FBQSxDQUR2QixhQUFhLENBQUMsY0FBRCxDQUNVLENBQUEsRUFBWCxXQUFXLENBQVg7U0FBQSxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHsgUG9seW1lckVsZW1lbnQgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL3BvbHltZXItZWxlbWVudCc7XG5pbXBvcnQgeyBta1RlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgcHJvcGVydHksIGN1c3RvbUVsZW1lbnQgfSBmcm9tICdAcG9seW1lci9kZWNvcmF0b3JzL2xpYi9kZWNvcmF0b3JzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHZpZXcgZnJvbSAnLi9jb25maXJtL2NvbmZpcm0ucHVnJztcblxuZXhwb3J0IGludGVyZmFjZSBEb3BlQ29uZmlybUluaXQge1xuICBjYXB0aW9uPzogc3RyaW5nO1xuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmcsXG4gIGNhbmNlbEJ1dHRvbkxhYmVsPzogc3RyaW5nXG59XG5cbi8qKlxuICogSW1wbG1lbnRzIGFzeW5jaHJvbm91cyBjb25maXJtYXRpb24gZGlhbG9nLlxuICovXG5AY3VzdG9tRWxlbWVudCgnZG9wZS1jb25maXJtJylcbmV4cG9ydCBjbGFzcyBEb3BlQ29uZmlybSBleHRlbmRzIFBvbHltZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIG1rVGVtcGxhdGUodmlldyk7IH1cblxuICAvKipcbiAgICogU2hvd3MgY29uZmlybWF0aW9uIGRpYWxvZywgcmV0dXJucyBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgaWYgdXNlciBoYXMgY2xpY2tlZCB0aGUgY29uZmlybSBidXR0b24sIG9yIHJlamVjdGVkIGlmXG4gICAqIHVzZXIgaGFzIGNsaWNrZWQgdGhlIGNhbmNlbCBidXR0b24uXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlIENvbmZpcm1hdGlvbiBtZXNzYWdlIHRvIHNob3cuXG4gICAqIEBwYXJhbSBjYXB0aW9uIE9wdGlvbmFsIGFsZXJ0IGNhcHRpb24uXG4gICAqL1xuICBzdGF0aWMgc2hvdyhtZXNzYWdlOiBzdHJpbmcsIGNhcHRpb24/OiBEb3BlQ29uZmlybUluaXR8c3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGRpYWxvZyA9IDxEb3BlQ29uZmlybT5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkb3BlLWNvbmZpcm0nKTtcbiAgICAgIGRvbS5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICBkaWFsb2cubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICBpZiAoY2FwdGlvbikge1xuICAgICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBjYXB0aW9uKSB7XG4gICAgICAgICAgZGlhbG9nLmNhcHRpb24gPSBjYXB0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpYWxvZy5jYXB0aW9uID0gY2FwdGlvbi5jYXB0aW9uIHx8ICdNZWdlcsWRc8OtdMOpcyc7XG4gICAgICAgICAgaWYgKGNhcHRpb24uY29uZmlybUJ1dHRvbkxhYmVsKSB7XG4gICAgICAgICAgICBkaWFsb2cuY29uZmlybUJ1dHRvbkxhYmVsID0gY2FwdGlvbi5jb25maXJtQnV0dG9uTGFiZWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjYXB0aW9uLmNhbmNlbEJ1dHRvbkxhYmVsKSB7XG4gICAgICAgICAgICBkaWFsb2cuY2FuY2VsQnV0dG9uTGFiZWwgPSBjYXB0aW9uLmNhbmNlbEJ1dHRvbkxhYmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlhbG9nLmNhcHRpb24gPSAnTWVnZXLFkXPDrXTDqXMnO1xuICAgICAgfVxuICAgICAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2RvcGUtb2snLCAoKSA9PiB7XG4gICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgICAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2RvcGUtY2FuY2VsJywgKCkgPT4ge1xuICAgICAgICBkaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgIHJlamVjdCgnY2FuY2VsbGVkJyk7XG4gICAgICB9LCBmYWxzZSlcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0aW9uIG9mIHRoZSBkaWFsb2cuXG4gICAqL1xuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgY2FwdGlvbj86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBBbGVydCBtZXNzYWdlLlxuICAgKi9cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIG1lc3NhZ2U/OiBzdHJpbmdcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmcgPSAnTWVnZXLFkXPDrXTDqXMnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBjYW5jZWxCdXR0b25MYWJlbDogc3RyaW5nID0gJ03DqWdzZW0nO1xuXG4gIG9uT2tDbGljaygpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdkb3BlLW9rJykpO1xuICB9XG5cbiAgb25DYW5jZWxDbGljaygpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdkb3BlLWNhbmNlbCcpKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=