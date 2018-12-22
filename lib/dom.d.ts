declare const dom: {
    readonly body: HTMLBodyElement;
    detach(node: Node): Node;
    remove(node: Node): void;
};
export default dom;
