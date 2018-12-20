var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import "../dialog/dialog.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mkTemplate } from "../templates.js";
import { property, customElement } from "@polymer/decorators/lib/decorators.js";
import dom from "../dom.js";
const view = "<style>:host{display:block;position:fixed;z-index:9999}dope-dialog{--dialog-width: 20rem}p{margin:0}\n\n/*# sourceMappingURL=alert.css.map */</style><dope-dialog caption=\"[[caption]]\"><p slot=\"body\">[[message]]</p><div class=\"buttons\" slot=\"buttons\"><dope-flat-button label=\"Ok\" on-click=\"onOkClick\"></dope-flat-button></div></dope-dialog>";
/**
 * Implments asynchronous alert message.
 */

let DopeAlert = class DopeAlert extends PolymerElement {
  static get template() {
    return mkTemplate(view);
  }
  /**
   * Shows alert message, returns promise that is resolved once user has clicked the "OK" button.
   *
   * @param message Alert message to show
   * @param caption Optional alert caption.
   */


  static show(message, caption) {
    return new Promise(resolve => {
      const dialog = document.createElement('dope-alert');
      dom.body.appendChild(dialog);
      dialog.message = message;
      dialog.caption = caption || 'Üzenet';
      dialog.addEventListener('dope-ok', () => {
        dialog.remove();
        resolve();
      });
    });
  }

  onOkClick() {
    this.dispatchEvent(new CustomEvent('dope-ok'));
  }

};

__decorate([property({
  type: String
})], DopeAlert.prototype, "caption", void 0);

__decorate([property({
  type: String
})], DopeAlert.prototype, "message", void 0);

DopeAlert = __decorate([customElement('dope-alert')], DopeAlert);
export { DopeAlert };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxxQkFBUDtBQUNBLFNBQVMsY0FBVCxRQUErQixxQ0FBL0I7QUFDQSxTQUFTLFVBQVQsUUFBMkIsaUJBQTNCO0FBQ0EsU0FBUyxRQUFULEVBQW1CLGFBQW5CLFFBQXdDLHVDQUF4QztBQUNBLE9BQU8sR0FBUCxNQUFnQixXQUFoQjtNQUNPLEk7QUFFUDs7OztBQUlBLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQWIsU0FBK0IsY0FBL0IsQ0FBNkM7QUFDM0MsYUFBVyxRQUFYLEdBQW1CO0FBQUssV0FBTyxVQUFVLENBQUMsSUFBRCxDQUFqQjtBQUEwQjtBQUVsRDs7Ozs7Ozs7QUFNQSxTQUFPLElBQVAsQ0FBWSxPQUFaLEVBQTZCLE9BQTdCLEVBQTZDO0FBQzNDLFdBQU8sSUFBSSxPQUFKLENBQVksT0FBTyxJQUFHO0FBQzNCLFlBQU0sTUFBTSxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQTFCO0FBQ0EsTUFBQSxHQUFHLENBQUMsSUFBSixDQUFTLFdBQVQsQ0FBcUIsTUFBckI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQWpCO0FBQ0EsTUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQUFPLElBQUksUUFBNUI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFLO0FBQ3RDLFFBQUEsTUFBTSxDQUFDLE1BQVA7QUFDQSxRQUFBLE9BQU87QUFDUixPQUhEO0FBSUQsS0FUTSxDQUFQO0FBVUQ7O0FBY0QsRUFBQSxTQUFTLEdBQUE7QUFDUCxTQUFLLGFBQUwsQ0FBbUIsSUFBSSxXQUFKLENBQWdCLFNBQWhCLENBQW5CO0FBQ0Q7O0FBcEMwQyxDQUE3Qzs7QUEwQkUsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUU7QUFBUixDQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBTUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUU7QUFBUixDQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBaENXLFNBQVMsR0FBQSxVQUFBLENBQUEsQ0FEckIsYUFBYSxDQUFDLFlBQUQsQ0FDUSxDQUFBLEVBQVQsU0FBUyxDQUFUO1NBQUEsUyIsInNvdXJjZVJvb3QiOiIifQ==