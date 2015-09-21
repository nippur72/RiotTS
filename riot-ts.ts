module Riot
{
   export interface Settings {
      brackets: string;      
   }

   export class Observable {
      on(events: string, callback: Function) {}
      one(events: string, callback: Function) {}
      off(events: string) {}
      trigger(eventName: string, ...args) {}

      constructor() {
         riot.observable(this);
      }
   }

   export interface Router {
      (callback: Function);
      (to: string);                       

      start();
      stop();
      exec(callback: Function);
      parser(parser: Function);
   }

   export interface Base 
   {
      version: string;
      settings: Riot.Settings;
      mount(customTagSelector: string, opts?: any): Array<Riot.Element>;
      mount(selector: string, tagName: string, opts?: any): Array<Riot.Element>;
      mount(domNode: Node, tagName: string, opts?: any): Array<Riot.Element>;
      render(tagName: string, opts?: any): string;
      tag(tagName: string, html: string, css?: string, attrs?: string,constructor?: Function);
      tag(tagName: string, html: string, constructor?: Function);   
      class(element: Function): void;
      observable(object: any): void;

      mixin(mixinName: string, mixinObject: any): void;
      
      compile(callback: Function): void;
      compile(url: string, callback: Function): void;
      compile(tag: string): string;
      compile(tag: string, dontExecute: boolean): string;

      // TODO server-only methods
   
      route: Riot.Router;
   }

   export interface LifeCycle
   {
      mounted?(F: Function);
      unmounted?(F: Function);
      updating?(F: Function);
      updated?(F: Function);
   }

   export interface HTMLRiotElement extends HTMLElement
   {
      _tag: Element;
   }

   export class Element implements Riot.Observable, LifeCycle {
      opts: any;
      parent: Element;
      root: HTMLElement;
      tags: any;
      tagName: string;
      template: string;
      isMounted: boolean;

      update(data?: any) { }
      unmount(keepTheParent?: boolean) { }
      on(eventName: string,fun: Function) { }
      one(eventName: string,fun: Function) { }
      off(events: string) {}
      trigger(eventName: string,...args) {}       
      mixin(mixinObject: Object|Function|string, instance?: any) {}            

      static register() {
         registerClass(this);
      } 

      static createElement(options?:any): HTMLRiotElement {
         var tagName = (this.prototype as any).tagName;
         var el = document.createElement(tagName);        
         riot.mount(el, tagName, options);   
         return el as any as HTMLRiotElement;
      }      
   }
   
   // new extend, works with getters and setters
   function extend(d, element) {   
      var map = Object.keys(element.prototype).reduce((descriptors, key) => {
         descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
         return descriptors;
      },{}) as PropertyDescriptorMap;
      Object.defineProperties(d, map);
   }
         
   /* old extend, without getters and setters
   function extend(d, element) {   
      Object.keys(element.prototype).forEach((key) => d[key] = element.prototype[key]);
   }
   */

   export function registerAll()
   {
      waitingToBeRegistered.map((el: any)=>el.register());
      waitingToBeRegistered = [];
   }

   export var waitingToBeRegistered: Array<Function> = [];

   export function registerClass(element: Function) {    
      
      function registerTag(template: string) {

         var transformFunction = function (opts) {
            // copies prototype into "this"            
            extend(this,element);
            // calls class constructor applying it on "this"
            element.apply(this, [opts]);
            if(element.prototype.mounted   !== undefined) this.on("mount"   , this.mounted);
            if(element.prototype.unmounted !== undefined) this.on("unmount" , this.unmounted);
            if(element.prototype.updating  !== undefined) this.on("update"  , this.updating);
            if(element.prototype.updated   !== undefined) this.on("updated" , this.updated);
         };
         
         var compiled = riot.compile(template,true);
         var r = compiled.indexOf("riot.tag(");
         var stripped = compiled.substr(r+9);
         var x = stripped.lastIndexOf(", function(opts) {");
         stripped = stripped.substr(0,x);

         var compiledTemplate = eval("["+stripped+"]");

         var tagName = compiledTemplate.length>0 ? compiledTemplate[0] : "";
         var html    = compiledTemplate.length>1 ? compiledTemplate[1] : "";
         var css     = compiledTemplate.length>2 ? compiledTemplate[2] : "";
         var attr    = compiledTemplate.length>3 ? compiledTemplate[3] : undefined;

         riot.tag(tagName, html, css, attr, transformFunction);         

         return tagName;
      }      

      let template: string;

      // gets string template, directly, via #id or via http request
      if(Object.keys(element.prototype).indexOf("template")>=0) {
         template = element.prototype.template;
         if(template.indexOf("<")<0) {
            var req = new XMLHttpRequest();
            // TODO do it asynchronously
            req.open("GET", template, false);
            req.send();
            if (req.status == 200) {
               template = req.responseText;
               element.prototype.tagName = registerTag(template);
            }
            return;
         }
         else 
         {
            element.prototype.tagName = registerTag(template);
         }
      }
      else throw "template property not specified";   
   }
}

declare var riot: Riot.Base;

// @template decorator
function template(template: string) {
	return function(target: Function) {
      target.prototype["template"] = template;
      Riot.waitingToBeRegistered.push(target);
   }	
}
                     