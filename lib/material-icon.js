import dom from "./dom.js";
import { icons as ics } from "./icons.js";
const icons = ics;
const keyIconType = Symbol('iconType');
export class DopeMaterialIcon extends HTMLElement {
  static get observedAttributes() {
    return ['type'];
  }

  updateSvg() {
    if (!this.iconType) {
      this.icon && dom.remove(this.icon);
      this.icon = undefined;
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
          this.icon = this.parentNode.insertBefore(icon, this);
        }
      }
    }
  }

  attributeChangedCallback(name, _, newValue) {
    if ('type' === name) {
      this.iconType = newValue;
      this.updateSvg();
    }
  }

  connectedCallback() {
    this.updateSvg();
  }

  disconnectedCallback() {
    this.icon && dom.remove(this.icon);
    this.icon = undefined;
  }

}
;
customElements.define('dope-material-icon', DopeMaterialIcon);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFQLE1BQWdCLFVBQWhCO0FBQ0EsU0FBeUIsS0FBSyxJQUFJLEdBQWxDLFFBQTZDLFlBQTdDO0FBTUEsTUFBTSxLQUFLLEdBQVUsR0FBckI7QUFFQSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBRCxDQUExQjtBQUVBLE9BQU0sTUFBTyxnQkFBUCxTQUFnQyxXQUFoQyxDQUEyQztBQUMvQyxhQUFXLGtCQUFYLEdBQTZCO0FBQUssV0FBTyxDQUFFLE1BQUYsQ0FBUDtBQUFtQjs7QUFNN0MsRUFBQSxTQUFTLEdBQUE7QUFDZixRQUFJLENBQUMsS0FBSyxRQUFWLEVBQW9CO0FBQ2xCLFdBQUssSUFBTCxJQUFhLEdBQUcsQ0FBQyxNQUFKLENBQVcsS0FBSyxJQUFoQixDQUFiO0FBQ0EsV0FBSyxJQUFMLEdBQVksU0FBWjtBQUNELEtBSEQsTUFHTztBQUNMLFVBQUksS0FBSyxJQUFULEVBQWU7QUFDYixZQUFJLEtBQUssSUFBTCxDQUFVLFdBQVYsTUFBMkIsS0FBSyxRQUFwQyxFQUE4QztBQUM1QztBQUNEOztBQUNELGFBQUssSUFBTCxDQUFVLE1BQVY7QUFDQSxhQUFLLElBQUwsR0FBWSxTQUFaO0FBQ0Q7O0FBQ0QsVUFBSSxLQUFLLFVBQUwsSUFBbUIsS0FBSyxhQUE1QixFQUEyQztBQUN6QyxjQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxRQUFOLENBQWpCOztBQUNBLFlBQUksR0FBSixFQUFTO0FBQ1AsZ0JBQU0sSUFBSSxHQUFHLEtBQUssYUFBTCxDQUFtQixlQUFuQixDQUFtQyw0QkFBbkMsRUFBaUUsS0FBakUsQ0FBYjs7QUFDQSxjQUFJLEdBQUcsQ0FBQyxPQUFSLEVBQWlCO0FBQ2YsWUFBQSxJQUFJLENBQUMsWUFBTCxDQUFrQixTQUFsQixFQUE2QixHQUFHLENBQUMsT0FBakM7QUFDRDs7QUFDRCxVQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEdBQUcsQ0FBQyxRQUFyQjtBQUNBLFVBQUEsSUFBSSxDQUFDLFdBQUQsQ0FBSixHQUFvQixLQUFLLFFBQXpCO0FBQ0EsZUFBSyxJQUFMLEdBQVksS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DLElBQW5DLENBQVo7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxFQUFBLHdCQUF3QixDQUFDLElBQUQsRUFBZSxDQUFmLEVBQTJCLFFBQTNCLEVBQTRDO0FBQ2xFLFFBQUksV0FBVyxJQUFmLEVBQXFCO0FBQ25CLFdBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFdBQUssU0FBTDtBQUNEO0FBQ0Y7O0FBRUQsRUFBQSxpQkFBaUIsR0FBQTtBQUNmLFNBQUssU0FBTDtBQUNEOztBQUVELEVBQUEsb0JBQW9CLEdBQUE7QUFDbEIsU0FBSyxJQUFMLElBQWEsR0FBRyxDQUFDLE1BQUosQ0FBVyxLQUFLLElBQWhCLENBQWI7QUFDQSxTQUFLLElBQUwsR0FBWSxTQUFaO0FBQ0Q7O0FBaEQ4QztBQWlEaEQ7QUFFRCxjQUFjLENBQUMsTUFBZixDQUFzQixvQkFBdEIsRUFBNEMsZ0JBQTVDIiwic291cmNlUm9vdCI6IiJ9