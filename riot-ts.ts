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

   export interface Base {
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

      // TODO compiler and parser
   
      route: Riot.Router;
   }

   export interface LifeCycle
   {
      mounted?(F: Function);
      unmounted?(F: Function);
      updating?(F: Function);
      updated?(F: Function);
   }

   export class Element implements Riot.Observable, LifeCycle {
      opts: any;
      parent: any;
      root: HTMLElement;
      tags: any;

      update(data?: any) { }
      unmount(keepTheParent?: boolean) { }
      on(eventName: string,fun: Function) { }
      one(eventName: string,fun: Function) { }
      off(events: string) {}
      trigger(eventName: string,...args) {}       

      static register() {
         registerClass(this);
      } 

      static createElement(options?:any) {
         var tagName = (this.prototype as any).tagName;
         var el = document.createElement(tagName);        
         riot.mount(el, tagName, options);   
         return el;
      }      
   }

   function endsWith(s, searchString, position?) {
      var subjectString = s.toString();
      if (position === undefined || position > subjectString.length) {
         position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
   };

   export function registerClass(element: Function) {
      var tagName;
      var template: string;

      function registerTag(tagName: string, template: string) {
         var transformFunction = function (opts) {
            // copies prototype into "this"
            Object.keys(element.prototype).forEach((key) => this[key] = element.prototype[key]);
            // calls class constructor applying it on "this"
            element.apply(this, [opts]);
            if(element.prototype.mounted   !== undefined) this.on("mount"   , this.mounted);
            if(element.prototype.unmounted !== undefined) this.on("unmount" , this.unmounted);
            if(element.prototype.updating  !== undefined) this.on("update"  , this.updating);
            if(element.prototype.updated   !== undefined) this.on("updated" , this.updated);
         };
         riot.tag(tagName, template, transformFunction);         
      }

      // gets tag name from tagName property
      if (Object.keys(element.prototype).indexOf("tagName") >= 0) {
         tagName = element.prototype.tagName;
      }
      else throw "tagName property not specified"; 

      // gets string template, directly, via #id or via http request
      if(Object.keys(element.prototype).indexOf("template")>=0) {
         template=element.prototype.template;
         // Obsolete: load template from script tag
         //if (template.charAt(0) == "#") {
         //   var elementId = template.substr(1);
         //   template = document.getElementById(elementId).innerHTML;         
         //} else 
         if (endsWith(template,".html")) {
            var req = new XMLHttpRequest();
            // TODO do it asynchronously
            req.open("GET", template, false);
            req.send();
            if (req.status == 200) {
               template = req.responseText;
               registerTag(tagName, template);
            }
            return;
         }
         else registerTag(tagName, template);
      }
      else throw "template property not specified";   
   }

}

declare var riot: Riot.Base;

// @component decorator
function component(tagname: string, template?: string) {
	return function(target: Function) {
      target.prototype["tagName"] = tagname;
      if (template !== undefined)
      {
         target.prototype["template"] = template;
      }
	}
}

// @template decorator
function template(template: string) {
	return function(target: Function) {
      target.prototype["template"] = template;
   }	
}
                     