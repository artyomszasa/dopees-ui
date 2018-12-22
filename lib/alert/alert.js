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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxxQkFBUDtBQUNBLFNBQVMsY0FBVCxRQUErQixxQ0FBL0I7QUFDQSxTQUFTLFVBQVQsUUFBMkIsaUJBQTNCO0FBQ0EsU0FBUyxRQUFULEVBQW1CLGFBQW5CLFFBQXdDLHVDQUF4QztBQUNBLE9BQU8sR0FBUCxNQUFnQixXQUFoQjtNQUNPLEk7QUFFUDs7OztBQUlBLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQWIsU0FBK0IsY0FBL0IsQ0FBNkM7QUFDM0MsYUFBVyxRQUFYLEdBQW1CO0FBQUssV0FBTyxVQUFVLENBQUMsSUFBRCxDQUFqQjtBQUEwQjtBQUVsRDs7Ozs7Ozs7QUFNQSxTQUFPLElBQVAsQ0FBWSxPQUFaLEVBQTZCLE9BQTdCLEVBQTZDO0FBQzNDLFdBQU8sSUFBSSxPQUFKLENBQVksT0FBTyxJQUFHO0FBQzNCLFlBQU0sTUFBTSxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQTFCO0FBQ0EsTUFBQSxHQUFHLENBQUMsSUFBSixDQUFTLFdBQVQsQ0FBcUIsTUFBckI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQWpCO0FBQ0EsTUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQUFPLElBQUksUUFBNUI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFLO0FBQ3RDLFFBQUEsTUFBTSxDQUFDLE1BQVA7QUFDQSxRQUFBLE9BQU87QUFDUixPQUhEO0FBSUQsS0FUTSxDQUFQO0FBVUQ7O0FBY0QsRUFBQSxTQUFTLEdBQUE7QUFDUCxTQUFLLGFBQUwsQ0FBbUIsSUFBSSxXQUFKLENBQWdCLFNBQWhCLENBQW5CO0FBQ0Q7O0FBcEMwQyxDQUE3Qzs7QUEwQkUsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUU7QUFBUixDQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBTUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUU7QUFBUixDQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBaENXLFNBQVMsR0FBQSxVQUFBLENBQUEsQ0FEckIsYUFBYSxDQUFDLFlBQUQsQ0FDUSxDQUFBLEVBQVQsU0FBUyxDQUFUO1NBQUEsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vZGlhbG9nL2RpYWxvZyc7XG5pbXBvcnQgeyBQb2x5bWVyRWxlbWVudCB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvcG9seW1lci1lbGVtZW50JztcbmltcG9ydCB7IG1rVGVtcGxhdGUgfSBmcm9tICcuLi90ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgcHJvcGVydHksIGN1c3RvbUVsZW1lbnQgfSBmcm9tICdAcG9seW1lci9kZWNvcmF0b3JzL2xpYi9kZWNvcmF0b3JzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vZG9tJztcbmltcG9ydCB2aWV3IGZyb20gJy4vYWxlcnQucHVnJztcblxuLyoqXG4gKiBJbXBsbWVudHMgYXN5bmNocm9ub3VzIGFsZXJ0IG1lc3NhZ2UuXG4gKi9cbkBjdXN0b21FbGVtZW50KCdkb3BlLWFsZXJ0JylcbmV4cG9ydCBjbGFzcyBEb3BlQWxlcnQgZXh0ZW5kcyBQb2x5bWVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBta1RlbXBsYXRlKHZpZXcpOyB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGFsZXJ0IG1lc3NhZ2UsIHJldHVybnMgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIG9uY2UgdXNlciBoYXMgY2xpY2tlZCB0aGUgXCJPS1wiIGJ1dHRvbi5cbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgQWxlcnQgbWVzc2FnZSB0byBzaG93XG4gICAqIEBwYXJhbSBjYXB0aW9uIE9wdGlvbmFsIGFsZXJ0IGNhcHRpb24uXG4gICAqL1xuICBzdGF0aWMgc2hvdyhtZXNzYWdlOiBzdHJpbmcsIGNhcHRpb24/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBkaWFsb2cgPSA8RG9wZUFsZXJ0PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RvcGUtYWxlcnQnKTtcbiAgICAgIGRvbS5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZyk7XG4gICAgICBkaWFsb2cubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICBkaWFsb2cuY2FwdGlvbiA9IGNhcHRpb24gfHwgJ8OcemVuZXQnO1xuICAgICAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2RvcGUtb2snLCAoKSA9PiB7XG4gICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0aW9uIG9mIHRoZSBkaWFsb2cuXG4gICAqL1xuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgY2FwdGlvbj86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBBbGVydCBtZXNzYWdlLlxuICAgKi9cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIG1lc3NhZ2U/OiBzdHJpbmdcblxuICBvbk9rQ2xpY2soKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZG9wZS1vaycpKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=