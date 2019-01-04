declare const dom: {
    readonly body: HTMLBodyElement;
    detach(node: Node): Node;
    remove(node: Node): void;
    replace(oldNode: Node, newNode: Node): Node;
};
export default dom;
