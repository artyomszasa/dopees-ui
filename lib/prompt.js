var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { customElement, property } from "@polymer/decorators/lib/decorators.js";
import dom from "./dom.js";
import { mkTemplate } from "./templates.js";
const view = "<style>:host{display:block;position:fixed;z-index:9999}dope-dialog{--dialog-width: 20rem}p{margin:0}\n\n/*# sourceMappingURL=prompt.css.map */</style><dope-dialog caption=\"[[caption]]\"><p slot=\"body\"><dope-text-box value=\"{{value}}\" label=\"[[label]]\" hint=\"[[hint]]\"></dope-text-box></p><div class=\"buttons\" slot=\"buttons\"><dope-button label=\"Ok\" on-click=\"onOk\"></dope-button></div></dope-dialog>";
let DopePrompt = class DopePrompt extends PolymerElement {
  constructor() {
    super(...arguments);
    this.caption = 'Üzenet';
  }

  static get template() {
    return mkTemplate(view);
  }

  static show(init, caption, hint, value) {
    let opts;

    if ('string' === typeof init) {
      opts = {
        label: init,
        caption: caption,
        hint: hint,
        value: value
      };
    } else {
      opts = init;
    }

    return new Promise(resolve => {
      const dialog = document.createElement('dope-prompt');
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

  onOk() {
    this.dispatchEvent(new CustomEvent('dope-ok', {
      detail: this.value
    }));
  }

};

__decorate([property({
  type: String
})], DopePrompt.prototype, "caption", void 0);

__decorate([property({
  type: String
})], DopePrompt.prototype, "label", void 0);

__decorate([property({
  type: String
})], DopePrompt.prototype, "hint", void 0);

__decorate([property({
  type: String
})], DopePrompt.prototype, "value", void 0);

DopePrompt = __decorate([customElement('dope-prompt')], DopePrompt);
export { DopePrompt };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bXBvcnQgeyBQb2x5bWVyRWxlbWVudCB9IGZyb20gXCJAcG9seW1lci9wb2x5bWVyL3BvbHltZXItZWxlbWVudFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHkgfSBmcm9tIFwiQHBvbHltZXIvZGVjb3JhdG9ycy9saWIvZGVjb3JhdG9yc1wiO1xuaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IG1rVGVtcGxhdGUgfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB2aWV3IGZyb20gJy4vcHJvbXB0L3Byb21wdC5wdWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvcGVQcm9tcHRJbml0IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgY2FwdGlvbj86IHN0cmluZztcbiAgaGludD86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmc7XG59XG5cbkBjdXN0b21FbGVtZW50KCdkb3BlLXByb21wdCcpXG5leHBvcnQgY2xhc3MgRG9wZVByb21wdCBleHRlbmRzIFBvbHltZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIG1rVGVtcGxhdGUodmlldyk7IH1cblxuICBzdGF0aWMgc2hvdyhsYWJlbDogc3RyaW5nLCBjYXB0aW9uPzogc3RyaW5nLCBoaW50Pzogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbiAgc3RhdGljIHNob3coaW5pdDogRG9wZVByb21wdEluaXQpOiBQcm9taXNlPHN0cmluZz47XG4gIHN0YXRpYyBzaG93KGluaXQ6IHN0cmluZ3xEb3BlUHJvbXB0SW5pdCwgY2FwdGlvbj86IHN0cmluZywgaGludD86IHN0cmluZywgdmFsdWU/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxldCBvcHRzOiBEb3BlUHJvbXB0SW5pdDtcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBpbml0KSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICBsYWJlbDogaW5pdCxcbiAgICAgICAgY2FwdGlvbjogY2FwdGlvbixcbiAgICAgICAgaGludDogaGludCxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdHMgPSBpbml0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGRpYWxvZyA9IDxEb3BlUHJvbXB0PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkb3BlLXByb21wdCcpO1xuICAgICAgZG9tLmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nKTtcbiAgICAgIGRpYWxvZy5sYWJlbCA9IG9wdHMubGFiZWw7XG4gICAgICBkaWFsb2cuaGludCA9IG9wdHMuaGludDtcbiAgICAgIGRpYWxvZy5jYXB0aW9uID0gb3B0cy5jYXB0aW9uIHx8ICfDnHplbmV0JztcbiAgICAgIGRpYWxvZy52YWx1ZSA9IG9wdHMudmFsdWU7XG4gICAgICBkaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignZG9wZS1vaycsICgpID0+IHtcbiAgICAgICAgZG9tLnJlbW92ZShkaWFsb2cpO1xuICAgICAgICByZXNvbHZlKGRpYWxvZy52YWx1ZSk7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgY2FwdGlvbjogc3RyaW5nID0gJ8OcemVuZXQnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBsYWJlbD86IHN0cmluZztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgaGludD86IHN0cmluZztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdmFsdWU/OiBzdHJpbmc7XG5cbiAgb25PayAoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudDxTdHJpbmc+KCdkb3BlLW9rJywge1xuICAgICAgZGV0YWlsOiB0aGlzLnZhbHVlXG4gICAgfSkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9