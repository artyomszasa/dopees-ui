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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVMsY0FBVCxRQUErQixxQ0FBL0I7QUFDQSxTQUFTLGFBQVQsRUFBd0IsUUFBeEIsUUFBd0MsdUNBQXhDO0FBQ0EsT0FBTyw2Q0FBUDtBQUNBLFNBQXlCLFNBQXpCLFFBQTBDLHlCQUExQztBQU1BLElBQUksR0FBRyxHQUFHLENBQVY7O0FBRUEsTUFBTSxNQUFNLEdBQUcsTUFBSztBQUNsQixRQUFNLEVBQUUsR0FBRyxHQUFYO0FBQ0EsRUFBQSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQVo7QUFDQSxTQUFPLEVBQVA7QUFDRCxDQUpEOztBQU9BLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQWIsU0FBNkIsY0FBN0IsQ0FBMkM7QUFEM0MsRUFBQSxXQUFBLEdBQUE7O0FBSUUsU0FBQSxRQUFBLEdBQW1DLEVBQW5DO0FBaUJEOztBQWZDLEVBQUEsS0FBSyxHQUFBO0FBQ0gsVUFBTSxLQUFOO0FBQ0EsSUFBQSxTQUFTLENBQUMsSUFBSSxJQUFHO0FBQ2YsWUFBTSxHQUFHLEdBQXlCLElBQWxDO0FBQ0EsTUFBQSxHQUFHLENBQUMsRUFBSixHQUFTLE1BQU0sRUFBZjtBQUNBLFdBQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsR0FBdEI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE1BQUs7QUFDbkIsY0FBTSxLQUFLLEdBQUcsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixDQUFDLElBQUksR0FBRyxDQUFDLEVBQUosS0FBVyxDQUFDLENBQUMsRUFBMUMsQ0FBZDtBQUNBLGFBQUssTUFBTCxDQUFZLFVBQVosRUFBd0IsS0FBeEIsRUFBK0IsQ0FBL0I7QUFDSCxPQUhELEVBR0csSUFISDtBQUlELEtBUlEsQ0FBVDtBQVNEOztBQUNELEVBQUEsVUFBVSxDQUFFLFFBQUYsRUFBVTtBQUNoQixXQUFPLFdBQVcsUUFBUSxFQUExQjtBQUNIOztBQW5Cd0MsQ0FBM0M7O0FBR0UsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUUsRUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlLEVBQUEsTUFBTSxFQUFFO0FBQXZCLENBQUQsQ0FDVCxDQUFBLEUsaUJBQUEsRSxVQUFBLEUsS0FBc0MsQ0FBdEMsQ0FBQTs7QUFIVyxPQUFPLEdBQUEsVUFBQSxDQUFBLENBRG5CLGFBQWEsQ0FBQyxVQUFELENBQ00sQ0FBQSxFQUFQLE9BQU8sQ0FBUDtTQUFBLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2x5bWVyRWxlbWVudCB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvcG9seW1lci1lbGVtZW50JztcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5IH0gZnJvbSAnQHBvbHltZXIvZGVjb3JhdG9ycy9saWIvZGVjb3JhdG9ycyc7XG5pbXBvcnQgJ0Bwb2x5bWVyL3BvbHltZXIvbGliL2VsZW1lbnRzL2RvbS1yZXBlYXQnO1xuaW1wb3J0IHsgTG9nTWVzc2FnZURhdGEsIG9uTWVzc2FnZSB9IGZyb20gJ2RvcGVlcy1jb3JlL2xpYi9jb3JlJztcblxuaW50ZXJmYWNlIExvZ01lc3NhZ2VEYXRhV2l0aElkIGV4dGVuZHMgTG9nTWVzc2FnZURhdGEge1xuICBpZDogbnVtYmVyO1xufVxuXG5sZXQgc3VwID0gMDtcblxuY29uc3QgbmV4dElkID0gKCkgPT4ge1xuICBjb25zdCBpZCA9IHN1cDtcbiAgc3VwID0gc3VwICsgMTtcbiAgcmV0dXJuIGlkO1xufVxuXG5AY3VzdG9tRWxlbWVudCgnZG9wZS1sb2cnKVxuZXhwb3J0IGNsYXNzIERvcGVMb2cgZXh0ZW5kcyBQb2x5bWVyRWxlbWVudCB7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQXJyYXksIG5vdGlmeTogdHJ1ZSB9KVxuICBtZXNzYWdlczogTG9nTWVzc2FnZURhdGFXaXRoSWRbXSA9IFtdO1xuXG4gIHJlYWR5ICgpIHtcbiAgICBzdXBlci5yZWFkeSgpO1xuICAgIG9uTWVzc2FnZShkYXRhID0+IHtcbiAgICAgIGNvbnN0IG1zZyA9IDxMb2dNZXNzYWdlRGF0YVdpdGhJZD5kYXRhO1xuICAgICAgbXNnLmlkID0gbmV4dElkKCk7XG4gICAgICB0aGlzLnB1c2goJ21lc3NhZ2VzJywgbXNnKTtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWVzc2FnZXMuZmluZEluZGV4KG0gPT4gbXNnLmlkID09PSBtLmlkKTtcbiAgICAgICAgICB0aGlzLnNwbGljZSgnbWVzc2FnZXMnLCBpbmRleCwgMSk7XG4gICAgICB9LCA2MDAwKTtcbiAgICB9KVxuICB9XG4gIF9jbGFzc05hbWUgKHNldmVyaXR5KSB7XG4gICAgICByZXR1cm4gYG1lc3NhZ2UgJHtzZXZlcml0eX1gO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==