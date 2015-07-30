declare module Riot {
    var Events: {
        mount: string;
        unmount: string;
        update: string;
        updated: string;
    };
    interface Settings {
        brackets: string;
    }
    interface Observable {
        on(events: string, callback: Function): any;
        one(events: string, callback: Function): any;
        off(events: string): any;
        trigger(eventName: string, ...args: any[]): any;
    }
    interface Router {
        (callback: Function): any;
        (to: string): any;
        start(): any;
        stop(): any;
        exec(callback: Function): any;
        parser(parser: Function): any;
    }
    interface Base {
        version: string;
        settings: Riot.Settings;
        mount(customTagSelector: string, opts?: any): Array<Riot.Element>;
        mount(selector: string, tagName: string, opts?: any): Array<Riot.Element>;
        render(tagName: string, opts?: any): string;
        tag(tagName: string, html: string, css?: string, attrs?: string, constructor?: Function): any;
        tag(tagName: string, html: string, constructor?: Function): any;
        class(element: Function): void;
        route: Riot.Router;
    }
    class Element implements Riot.Observable {
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
    function endsWith(s: any, searchString: any, position?: any): boolean;
}
declare var riot: Riot.Base;
