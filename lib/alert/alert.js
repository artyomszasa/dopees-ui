var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '../dialog/dialog';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mkTemplate } from '../templates';
import { property, customElement } from '@polymer/decorators/lib/decorators';
import dom from '../dom';
import view from './alert.pug';
/**
 * Implments asynchronous alert message.
 */
let DopeAlert = class DopeAlert extends PolymerElement {
    static get template() { return mkTemplate(view); }
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
__decorate([
    property({ type: String })
], DopeAlert.prototype, "caption", void 0);
__decorate([
    property({ type: String })
], DopeAlert.prototype, "message", void 0);
DopeAlert = __decorate([
    customElement('dope-alert')
], DopeAlert);
export { DopeAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWxlcnQvYWxlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUN6QixPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFFL0I7O0dBRUc7QUFFSCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsY0FBYztJQUMzQyxNQUFNLEtBQUssUUFBUSxLQUFLLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBZSxFQUFFLE9BQWdCO1FBQzNDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxNQUFNLEdBQWMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxRQUFRLENBQUM7WUFDckMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWNELFNBQVM7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGLENBQUE7QUFYQztJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzswQ0FDWDtBQU1oQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzswQ0FDWDtBQWhDTCxTQUFTO0lBRHJCLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDZixTQUFTLENBcUNyQjtTQXJDWSxTQUFTIn0=