var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import "@polymer/polymer/lib/elements/dom-if.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { customElement, property } from "@polymer/decorators/lib/decorators.js";
import { mkTemplate } from "../templates.js";
const view = "<style>.wrapper{z-index:var(--dialog-z-index, 999);position:fixed;top:0;right:0;bottom:0;left:0;margin:0;background:rgba(0,0,0,0.12)}.dialog{position:absolute;top:var(--dialog-top, 10rem);right:0;left:0;margin:auto;height:var(--dialog-height, auto);width:var(--dialog-width);padding:1.5rem 0 0 0;background:var(--dialog-background, #fff);box-shadow:0 0.6875rem 0.9375rem -0.4375rem rgba(0,0,0,0.2),0 1.5rem 2.375rem 0.1875rem rgba(0,0,0,0.14),0 0.5625rem 2.875rem 0.5rem rgba(0,0,0,0.12);border-radius:0.125rem}.title{padding:0 1.5rem 1.25rem 1.5rem;font-size:1.25rem;font-weight:500}.body{padding:0 1.5rem 1.5rem 1.5rem;max-height:calc(100% - 7.5rem);overflow-x:hidden;overflow-y:auto}.buttons{padding:0.5rem;height:2.25rem}.buttons ::slotted(.buttons){display:flex;justify-content:flex-end}.buttons ::slotted(.buttons)>*{height:2.25rem;margin-left:0.5rem;min-width:4rem}@media only screen and (max-height: 660px){.dialog{top:5rem}.body{max-height:calc(100vh - 21rem)}}\n\n/*# sourceMappingURL=dialog.css.map */</style><div class=\"wrapper\"><div class=\"dialog\"><template is=\"dom-if\" if=\"[[caption]]\"><div class=\"title\">[[caption]]</div></template><div class=\"body\"><slot name=\"body\"></slot></div><div class=\"buttons\"><slot name=\"buttons\"></slot></div></div></div>";
/**
 * Provides dialog skeleton with slottable body and buttons sections.
 */

let DopeDialog = class DopeDialog extends PolymerElement {
  static get template() {
    return mkTemplate(view);
  }

};

__decorate([property({
  type: String
})], DopeDialog.prototype, "caption", void 0);

DopeDialog = __decorate([customElement('dope-dialog')], DopeDialog);
export { DopeDialog };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU8seUNBQVA7QUFDQSxTQUFTLGNBQVQsUUFBK0IscUNBQS9CO0FBQ0EsU0FBUyxhQUFULEVBQXdCLFFBQXhCLFFBQXdDLHVDQUF4QztBQUNBLFNBQVMsVUFBVCxRQUEyQixpQkFBM0I7TUFDTyxJO0FBRVA7Ozs7QUFJQSxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFiLFNBQWdDLGNBQWhDLENBQThDO0FBQzVDLGFBQVcsUUFBWCxHQUFtQjtBQUFLLFdBQU8sVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFBMEI7O0FBRE4sQ0FBOUM7O0FBT0UsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUU7QUFBUixDQUFELENBQ1QsQ0FBQSxFLG9CQUFBLEUsU0FBQSxFLEtBQWlCLENBQWpCLENBQUE7O0FBUFcsVUFBVSxHQUFBLFVBQUEsQ0FBQSxDQUR0QixhQUFhLENBQUMsYUFBRCxDQUNTLENBQUEsRUFBVixVQUFVLENBQVY7U0FBQSxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAcG9seW1lci9wb2x5bWVyL2xpYi9lbGVtZW50cy9kb20taWYnO1xuaW1wb3J0IHsgUG9seW1lckVsZW1lbnQgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL3BvbHltZXItZWxlbWVudCc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSB9IGZyb20gJ0Bwb2x5bWVyL2RlY29yYXRvcnMvbGliL2RlY29yYXRvcnMnO1xuaW1wb3J0IHsgbWtUZW1wbGF0ZSB9IGZyb20gJy4uL3RlbXBsYXRlcyc7XG5pbXBvcnQgdmlldyBmcm9tICcuL2RpYWxvZy5wdWcnO1xuXG4vKipcbiAqIFByb3ZpZGVzIGRpYWxvZyBza2VsZXRvbiB3aXRoIHNsb3R0YWJsZSBib2R5IGFuZCBidXR0b25zIHNlY3Rpb25zLlxuICovXG5AY3VzdG9tRWxlbWVudCgnZG9wZS1kaWFsb2cnKVxuZXhwb3J0IGNsYXNzIERvcGVEaWFsb2cgZXh0ZW5kcyBQb2x5bWVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBta1RlbXBsYXRlKHZpZXcpOyB9XG5cbiAgLyoqXG4gICAqIENhcHRpb24gb2YgdGhlIGRpYWxvZy5cbiAgICovXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBjYXB0aW9uPzogc3RyaW5nO1xufSJdLCJzb3VyY2VSb290IjoiIn0=