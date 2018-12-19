var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/polymer/lib/elements/dom-if';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { customElement, property } from '@polymer/decorators/lib/decorators';
import { mkTemplate } from '../templates';
import view from './dialog.pug';
/**
 * Provides dialog skeleton with slottable body and buttons sections.
 */
let DopeDialog = class DopeDialog extends PolymerElement {
    static get template() { return mkTemplate(view); }
};
__decorate([
    property({ type: String })
], DopeDialog.prototype, "caption", void 0);
DopeDialog = __decorate([
    customElement('dope-dialog')
], DopeDialog);
export { DopeDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUVoQzs7R0FFRztBQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxjQUFjO0lBQzVDLE1BQU0sS0FBSyxRQUFRLEtBQUssT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBT25ELENBQUE7QUFEQztJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzsyQ0FDVjtBQVBOLFVBQVU7SUFEdEIsYUFBYSxDQUFDLGFBQWEsQ0FBQztHQUNoQixVQUFVLENBUXRCO1NBUlksVUFBVSJ9