declare module riot
{
   interface CompilerResult
   {
      tagName: string;
      html: string;
      css: string;
      attribs: string;
      js: string;
   }

   interface Compile
   {
      (callback: Function): void;
      (url: string, callback: Function): void;
      (tag: string): string;
      (tag: string, dontExecute: boolean): string;
      (tag: string, options: any): string;
      (tag: string, dontExecute: boolean, options: any): CompilerResult[];
   }

   interface Router {
      (callback: Function): void;
      (filter: string, callback: Function): void;
      (to: string, title?: string): void;

      create(): Router;
      start(autoExec?: boolean): void;
      stop(): void;
      exec(): void;
      query(): any;

      base(base: string): any;
      parser(parser: (path: string)=>string, secondParser?: Function ): any;
   }

   interface Settings {
      brackets: string;
   }

   type RiotElement = any;

   var version: string;
   var settings: Settings;
   function mount(customTagSelector: string, opts?: any): Array<RiotElement>;
   function mount(selector: string, tagName: string, opts?: any): Array<RiotElement>;
   function mount(domNode: Node, tagName: string, opts?: any): Array<RiotElement>;
   function render(tagName: string, opts?: any): string;
   function tag(tagName: string, html: string, css: string, attrs: string, constructor: Function): any;
   function tag2(tagName: string, html: string, css: string, attrs: string, constructor: Function, bpair: string): any;
   function _class(element: Function): void;
   function observable(object: any): void;
   function compile(callback: Function): void;
   function compile(url: string, callback: Function): void;
   function compile(tag: string): string;
   function compile(tag: string, dontExecute: boolean): string;
   function compile(tag: string, options: any): string;
   function compile(tag: string, dontExecute: boolean, options: any): CompilerResult[];
   function mixin(mixinName: string, mixinObject: any): void;

   var route: Router;   
}

