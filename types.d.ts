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
