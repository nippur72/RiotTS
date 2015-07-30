declare var RiotEvents: {
    mount: string;
    unmount: string;
    update: string;
    updated: string;
};
interface RiotSettings {
    brackets: string;
}
interface RiotObservable {
    on(events: string, callback: Function): any;
    one(events: string, callback: Function): any;
    off(events: string): any;
    trigger(eventName: string, ...args: any[]): any;
}
interface RiotRouter {
    (callback: Function): any;
    (to: string): any;
    start(): any;
    stop(): any;
    exec(callback: Function): any;
    parser(parser: Function): any;
}
interface RiotObject {
    version: string;
    settings: RiotSettings;
    mount(customTagSelector: string, opts?: any): Array<RiotElement>;
    mount(selector: string, tagName: string, opts?: any): Array<RiotElement>;
    render(tagName: string, opts?: any): string;
    tag(tagName: string, html: string, css?: string, attrs?: string, constructor?: Function): any;
    tag(tagName: string, html: string, constructor?: Function): any;
    class(element: Function): void;
    route: RiotRouter;
}
declare var riot: RiotObject;
declare class RiotElement implements RiotObservable {
    opts: any;
    parent: any;
    root: HTMLElement;
    tags: any;
    update(data?: any): void;
    unmount(keepTheParent?: boolean): void;
    on(eventName: string, fun: Function): void;
    one(eventName: string, fun: Function): void;
    off(events: string): void;
    trigger(eventName: string, ...args: any[]): void;
}
interface String {
    endsWith(s: string, position?: number): boolean;
}
