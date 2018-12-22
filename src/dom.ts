
const dom = {
  get body() {
    const body = document.querySelector('body');
    if (!body) {
      throw new Error('unable to get document body');
    }
    return body;
  },
  detach(node: Node) {
    if (node.parentNode) {
      return node.parentNode.removeChild(node);
    }
    return node;
  },
  remove(node: Node) { dom.detach(node); }
};

export default dom;