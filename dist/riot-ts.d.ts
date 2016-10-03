export declare class Observable {
    on(events: string, callback: Function): void;
    one(events: string, callback: Function): void;
    off(events: string): void;
    trigger(eventName: string, ...args: any[]): void;
    constructor();
}
export interface LifeCycle {
    mounted?(F: Function): any;
    unmounted?(F: Function): any;
    updating?(F: Function): any;
    updated?(F: Function): any;
}
export interface HTMLRiotElement extends HTMLElement {
    _tag: Element;
}
export declare class Element implements Observable, LifeCycle {
    opts: any;
    parent: Element;
    root: HTMLElement;
    tags: any;
    tagName: string;
    template: string;
    isMounted: boolean;
    update(data?: any): void;
    unmount(keepTheParent?: boolean): void;
    on(eventName: string, fun: Function): void;
    one(eventName: string, fun: Function): void;
    off(events: string): void;
    trigger(eventName: string, ...args: any[]): void;
    mixin(mixinObject: Object | Function | string, instance?: any): void;
    static createElement(options?: any): HTMLRiotElement;
}
export declare var precompiledTags: {
    [fileName: string]: CompilerResult;
};
export declare function registerClass(element: Function): void;
export declare function template(template: string): (target: Function) => void;
export interface Router {
    (callback: Function): void;
    (filter: string, callback: Function): void;
    (to: string, title?: string): any;
    create(): Router;
    start(autoExec?: boolean): any;
    stop(): any;
    exec(): any;
    query(): any;
    base(base: string): any;
    parser(parser: (path: string) => string, secondParser?: Function): any;
}
export interface CompilerResult {
    tagName: string;
    html: string;
    css: string;
    attribs: string;
    js: string;
}
export interface Settings {
    brackets: string;
}
export as namespace Riot;