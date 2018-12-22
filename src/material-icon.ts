import dom from "./dom";
import { IconDescriptor, icons as ics } from "./icons";

interface Icons {
  [key: string]: IconDescriptor|undefined
}

const icons: Icons = ics;

const keyIconType = Symbol('iconType');

export class DopeMaterialIcon extends HTMLElement {
  static removeEvent = 'icon-remove';
  static connectEvent = 'icon-connect';
  static clickEvent = 'icon-click';
  static get observedAttributes() { return [ 'type' ] }

  private iconType?: string;

  icon?: SVGSVGElement;

  private removeSvg() {
    if (this.icon) {
      dom.remove(this.icon);
      this.icon = undefined;
      this.dispatchEvent(new CustomEvent(DopeMaterialIcon.removeEvent, {
        bubbles: false,
        cancelable: false
      }));
    }
  }

  private updateSvg() {
    if (!this.iconType) {
      this.removeSvg();
    } else {
      if (this.icon) {
        if (this.icon[keyIconType] === this.iconType) {
          return;
        }
        this.icon.remove();
        this.icon = undefined;
      }
      if (this.parentNode && this.ownerDocument) {
        const svg = icons[this.iconType];
        if (svg) {
          const icon = this.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
          if (svg.viewBox) {
            icon.setAttribute('viewBox', svg.viewBox);
          }
          icon.innerHTML = svg.contents;
          icon[keyIconType] = this.iconType;
          const slot = this.getAttribute('slot');
          if (slot) {
            icon.setAttribute('slot', slot);
          }
          this.icon = this.parentNode.insertBefore(icon, this);
          this.icon.addEventListener('click', e => {
            const ex = new CustomEvent<MouseEvent>(DopeMaterialIcon.clickEvent, {
              bubbles: true,
              cancelable: true,
              detail: e
            });
            this.dispatchEvent(ex);
            if (ex.cancelBubble) {
              e.stopPropagation();
            }
            if (ex.defaultPrevented) {
              e.preventDefault();
            }
          }, false);
          this.dispatchEvent(new CustomEvent(DopeMaterialIcon.connectEvent, {
            bubbles: false,
            cancelable: false,
            detail: icon
          }));
        }
      }
    }
  }

  attributeChangedCallback(name: string, _?: string, newValue?: string) {
    if ('type' === name) {
      this.iconType = newValue;
      this.updateSvg();
    }
  }

  connectedCallback() {
    this.style.display = 'none';
    this.updateSvg();
  }

  disconnectedCallback() {
    this.removeSvg();
  }
};

customElements.define('dope-material-icon', DopeMaterialIcon);