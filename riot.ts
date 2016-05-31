declare module "riot"
{
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

   interface CompilerResult
   {
      tagName: string; 
      html: string; 
      css: string; 
      attribs: string;
      js: string;
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

      mixin(mixinName: string, mixinObject: any): void;
      
      compile(callback: Function): void;
      compile(url: string, callback: Function): void;
      compile(tag: string): string;
      compile(tag: string, dontExecute: boolean): string;
      compile(tag: string, options: any): string;
      compile(tag: string, dontExecute: boolean, options: any): CompilerResult[];

      // TODO server-only methods
   
      route: Router;
   }

   var riot: Base;

   export = riot;
}
