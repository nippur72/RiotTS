module Riot
{
   export var Events = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };

   export interface Settings {
      brackets: string;      
   }

   export interface Observable {
      on(events: string,callback: Function);
      one(events: string,callback: Function);
      off(events: string);
      trigger(eventName: string, ...args);
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
      mount(customTagSelector: string,opts?: any): Array<Riot.Element>;
      mount(selector: string,tagName: string,opts?: any): Array<Riot.Element>;
      render(tagName: string,opts?: any): string;
      tag(tagName: string, html: string,css?: string,attrs?: string,constructor?: Function);
      tag(tagName: string, html: string, constructor?: Function);   
      class(element: Function): void;

      // TODO compiler and parser
   
      route: Riot.Router;
   }

   export class Element implements Riot.Observable {
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
   }

   export function endsWith(s, searchString, position?) {
      var subjectString = s.toString();
      if (position === undefined || position > subjectString.length) {
         position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
   };
}

declare var riot: Riot.Base;

riot.class = function(element: Function) {
   var tagName;
   var template: string;

   function registerTag(tagName: string, template: string) {
      var transformFunction = function (opts) {
         // copies prototype into "this"
         Object.keys(element.prototype).forEach((key) => this[key] = element.prototype[key]);
         // calls class constructor applying it on "this"
         element.apply(this, [opts]);
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
      if (template.charAt(0) == "#") {
         var elementId = template.substr(1);
         template = document.getElementById(elementId).innerHTML;         
      }
      else if (Riot.endsWith(template,".html")) {
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

                     