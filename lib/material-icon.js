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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFQLE1BQWdCLFVBQWhCO0FBQ0EsU0FBeUIsS0FBSyxJQUFJLEdBQWxDLFFBQTZDLFlBQTdDO0FBTUEsTUFBTSxLQUFLLEdBQVUsR0FBckI7QUFFQSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBRCxDQUExQjtBQUVBLE9BQU0sTUFBTyxnQkFBUCxTQUFnQyxXQUFoQyxDQUEyQztBQUMvQyxhQUFXLGtCQUFYLEdBQTZCO0FBQUssV0FBTyxDQUFFLE1BQUYsQ0FBUDtBQUFtQjs7QUFNN0MsRUFBQSxTQUFTLEdBQUE7QUFDZixRQUFJLENBQUMsS0FBSyxRQUFWLEVBQW9CO0FBQ2xCLFdBQUssSUFBTCxJQUFhLEdBQUcsQ0FBQyxNQUFKLENBQVcsS0FBSyxJQUFoQixDQUFiO0FBQ0EsV0FBSyxJQUFMLEdBQVksU0FBWjtBQUNELEtBSEQsTUFHTztBQUNMLFVBQUksS0FBSyxJQUFULEVBQWU7QUFDYixZQUFJLEtBQUssSUFBTCxDQUFVLFdBQVYsTUFBMkIsS0FBSyxRQUFwQyxFQUE4QztBQUM1QztBQUNEOztBQUNELGFBQUssSUFBTCxDQUFVLE1BQVY7QUFDQSxhQUFLLElBQUwsR0FBWSxTQUFaO0FBQ0Q7O0FBQ0QsVUFBSSxLQUFLLFVBQUwsSUFBbUIsS0FBSyxhQUE1QixFQUEyQztBQUN6QyxjQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxRQUFOLENBQWpCOztBQUNBLFlBQUksR0FBSixFQUFTO0FBQ1AsZ0JBQU0sSUFBSSxHQUFHLEtBQUssYUFBTCxDQUFtQixlQUFuQixDQUFtQyw0QkFBbkMsRUFBaUUsS0FBakUsQ0FBYjs7QUFDQSxjQUFJLEdBQUcsQ0FBQyxPQUFSLEVBQWlCO0FBQ2YsWUFBQSxJQUFJLENBQUMsWUFBTCxDQUFrQixTQUFsQixFQUE2QixHQUFHLENBQUMsT0FBakM7QUFDRDs7QUFDRCxVQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEdBQUcsQ0FBQyxRQUFyQjtBQUNBLFVBQUEsSUFBSSxDQUFDLFdBQUQsQ0FBSixHQUFvQixLQUFLLFFBQXpCO0FBQ0EsZUFBSyxJQUFMLEdBQVksS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DLElBQW5DLENBQVo7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxFQUFBLHdCQUF3QixDQUFDLElBQUQsRUFBZSxDQUFmLEVBQTJCLFFBQTNCLEVBQTRDO0FBQ2xFLFFBQUksV0FBVyxJQUFmLEVBQXFCO0FBQ25CLFdBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFdBQUssU0FBTDtBQUNEO0FBQ0Y7O0FBRUQsRUFBQSxpQkFBaUIsR0FBQTtBQUNmLFNBQUssU0FBTDtBQUNEOztBQUVELEVBQUEsb0JBQW9CLEdBQUE7QUFDbEIsU0FBSyxJQUFMLElBQWEsR0FBRyxDQUFDLE1BQUosQ0FBVyxLQUFLLElBQWhCLENBQWI7QUFDQSxTQUFLLElBQUwsR0FBWSxTQUFaO0FBQ0Q7O0FBaEQ4QztBQWlEaEQ7QUFFRCxjQUFjLENBQUMsTUFBZixDQUFzQixvQkFBdEIsRUFBNEMsZ0JBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IEljb25EZXNjcmlwdG9yLCBpY29ucyBhcyBpY3MgfSBmcm9tIFwiLi9pY29uc1wiO1xuXG5pbnRlcmZhY2UgSWNvbnMge1xuICBba2V5OiBzdHJpbmddOiBJY29uRGVzY3JpcHRvcnx1bmRlZmluZWRcbn1cblxuY29uc3QgaWNvbnM6IEljb25zID0gaWNzO1xuXG5jb25zdCBrZXlJY29uVHlwZSA9IFN5bWJvbCgnaWNvblR5cGUnKTtcblxuZXhwb3J0IGNsYXNzIERvcGVNYXRlcmlhbEljb24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkgeyByZXR1cm4gWyAndHlwZScgXSB9XG5cbiAgcHJpdmF0ZSBpY29uVHlwZT86IHN0cmluZztcblxuICBpY29uPzogU1ZHU1ZHRWxlbWVudDtcblxuICBwcml2YXRlIHVwZGF0ZVN2ZygpIHtcbiAgICBpZiAoIXRoaXMuaWNvblR5cGUpIHtcbiAgICAgIHRoaXMuaWNvbiAmJiBkb20ucmVtb3ZlKHRoaXMuaWNvbik7XG4gICAgICB0aGlzLmljb24gPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaWNvbltrZXlJY29uVHlwZV0gPT09IHRoaXMuaWNvblR5cGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pY29uLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmljb24gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMub3duZXJEb2N1bWVudCkge1xuICAgICAgICBjb25zdCBzdmcgPSBpY29uc1t0aGlzLmljb25UeXBlXTtcbiAgICAgICAgaWYgKHN2Zykge1xuICAgICAgICAgIGNvbnN0IGljb24gPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgICAgICAgICBpZiAoc3ZnLnZpZXdCb3gpIHtcbiAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd2aWV3Qm94Jywgc3ZnLnZpZXdCb3gpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpY29uLmlubmVySFRNTCA9IHN2Zy5jb250ZW50cztcbiAgICAgICAgICBpY29uW2tleUljb25UeXBlXSA9IHRoaXMuaWNvblR5cGU7XG4gICAgICAgICAgdGhpcy5pY29uID0gdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpY29uLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIF8/OiBzdHJpbmcsIG5ld1ZhbHVlPzogc3RyaW5nKSB7XG4gICAgaWYgKCd0eXBlJyA9PT0gbmFtZSkge1xuICAgICAgdGhpcy5pY29uVHlwZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVTdmcoKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pY29uICYmIGRvbS5yZW1vdmUodGhpcy5pY29uKTtcbiAgICB0aGlzLmljb24gPSB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZG9wZS1tYXRlcmlhbC1pY29uJywgRG9wZU1hdGVyaWFsSWNvbik7Il0sInNvdXJjZVJvb3QiOiIifQ==