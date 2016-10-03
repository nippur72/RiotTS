declare module "riot/riot+compiler"
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
      (to: string, title?: string);

      create(): Router;
      start(autoExec?: boolean);
      stop();
      exec();
      query(): any;

      base(base: string);
      parser(parser: (path: string)=>string, secondParser?: Function );
   }

   interface Settings {
      brackets: string;
   }

   type RiotElement = any;

   interface Base
   {
      version: string;
      settings: Settings;
      mount(customTagSelector: string, opts?: any): Array<RiotElement>;
      mount(selector: string, tagName: string, opts?: any): Array<RiotElement>;
      mount(domNode: Node, tagName: string, opts?: any): Array<RiotElement>;
      render(tagName: string, opts?: any): string;
      tag(tagName: string, html: string, css: string, attrs: string, constructor: Function);
      tag2(tagName: string, html: string, css: string, attrs: string, constructor: Function, bpair: string);
      class(element: Function): void;
      observable(object: any): void;
      compile: Compile;

      mixin(mixinName: string, mixinObject: any): void;

      // TODO server-only methods

      route: Router;
   }

   var riot: Base;

   export = riot;
}
