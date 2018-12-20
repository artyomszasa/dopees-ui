var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { customElement, property } from "@polymer/decorators/lib/decorators.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import { onMessage } from "dopees-core/lib/core.js";
let sup = 0;

const nextId = () => {
  const id = sup;
  sup = sup + 1;
  return id;
};

let DopeLog = class DopeLog extends PolymerElement {
  constructor() {
    super(...arguments);
    this.messages = [];
  }

  ready() {
    super.ready();
    onMessage(data => {
      const msg = data;
      msg.id = nextId();
      this.push('messages', msg);
      window.setTimeout(() => {
        const index = this.messages.findIndex(m => msg.id === m.id);
        this.splice('messages', index, 1);
      }, 6000);
    });
  }

  _className(severity) {
    return `message ${severity}`;
  }

};

__decorate([property({
  type: Array,
  notify: true
})], DopeLog.prototype, "messages", void 0);

DopeLog = __decorate([customElement('dope-log')], DopeLog);
export { DopeLog };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVMsY0FBVCxRQUErQixxQ0FBL0I7QUFDQSxTQUFTLGFBQVQsRUFBd0IsUUFBeEIsUUFBd0MsdUNBQXhDO0FBQ0EsT0FBTyw2Q0FBUDtBQUNBLFNBQXlCLFNBQXpCLFFBQTBDLHlCQUExQztBQU1BLElBQUksR0FBRyxHQUFHLENBQVY7O0FBRUEsTUFBTSxNQUFNLEdBQUcsTUFBSztBQUNsQixRQUFNLEVBQUUsR0FBRyxHQUFYO0FBQ0EsRUFBQSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQVo7QUFDQSxTQUFPLEVBQVA7QUFDRCxDQUpEOztBQU9BLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQWIsU0FBNkIsY0FBN0IsQ0FBMkM7QUFEM0MsRUFBQSxXQUFBLEdBQUE7O0FBSUUsU0FBQSxRQUFBLEdBQW1DLEVBQW5DO0FBaUJEOztBQWZDLEVBQUEsS0FBSyxHQUFBO0FBQ0gsVUFBTSxLQUFOO0FBQ0EsSUFBQSxTQUFTLENBQUMsSUFBSSxJQUFHO0FBQ2YsWUFBTSxHQUFHLEdBQXlCLElBQWxDO0FBQ0EsTUFBQSxHQUFHLENBQUMsRUFBSixHQUFTLE1BQU0sRUFBZjtBQUNBLFdBQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsR0FBdEI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE1BQUs7QUFDbkIsY0FBTSxLQUFLLEdBQUcsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixDQUFDLElBQUksR0FBRyxDQUFDLEVBQUosS0FBVyxDQUFDLENBQUMsRUFBMUMsQ0FBZDtBQUNBLGFBQUssTUFBTCxDQUFZLFVBQVosRUFBd0IsS0FBeEIsRUFBK0IsQ0FBL0I7QUFDSCxPQUhELEVBR0csSUFISDtBQUlELEtBUlEsQ0FBVDtBQVNEOztBQUNELEVBQUEsVUFBVSxDQUFFLFFBQUYsRUFBVTtBQUNoQixXQUFPLFdBQVcsUUFBUSxFQUExQjtBQUNIOztBQW5Cd0MsQ0FBM0M7O0FBR0UsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlLEVBQUEsTUFBTSxFQUFFO0FBQXZCLENBQUQsQ0FDVCxDQUFBLEUsaUJBQUEsRSxVQUFBLEUsS0FBc0MsQ0FBdEMsQ0FBQTs7QUFIVyxPQUFPLEdBQUEsVUFBQSxDQUFBLENBRG5CLGFBQWEsQ0FBQyxVQUFELENBQ00sQ0FBQSxFQUFQLE9BQU8sQ0FBUDtTQUFBLE8iLCJzb3VyY2VSb290IjoiIn0=