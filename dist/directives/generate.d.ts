declare const generate: (type: string) => {
    bind(el: HTMLElement, binding: any, vnode: any): void;
    unbind(el: HTMLElement, binding: any): void;
    update(el: HTMLElement, binding: any, vnode: any): void;
};
export default generate;
