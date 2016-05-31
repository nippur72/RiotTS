declare module "riot-compiler" {
    interface CompilerResult {
        tagName: string;
        html: string;
        css: string;
        attribs: string;
        js: string;
    }
    interface Compile {
        (callback: Function): void;
        (url: string, callback: Function): void;
        (tag: string): string;
        (tag: string, dontExecute: boolean): string;
        (tag: string, options: any): string;
        (tag: string, dontExecute: boolean, options: any): CompilerResult[];
    }
    var compile: Compile;
    export = compile;
}
