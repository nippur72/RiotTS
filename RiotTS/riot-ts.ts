var RiotEvents = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };

interface RiotSettings {
   brackets: string;      
}

interface RiotObservable {
   on(events: string,callback: Function);
   one(events: string,callback: Function);
   off(events: string);
   trigger(eventName: string, ...args);
}

interface RiotRouter {
   (callback: Function);
   (to: string);

   start();
   stop();
   exec(callback: Function);
   parser(parser: Function);
}

interface RiotObject {
   version: string;
   settings: RiotSettings;
   mount(customTagSelector: string,opts?: any): Array<RiotElement>;
   mount(selector: string,tagName: string,opts?: any): Array<RiotElement>;
   render(tagName: string,opts?: any): string;
   tag(tagName: string, html: string,css?: string,attrs?: string,constructor?: Function);
   tag(tagName: string, html: string, constructor?: Function);   
   class(element: Function): void;

   // TODO compiler and parser
   
   route: RiotRouter;
}

declare var riot: RiotObject;

class RiotElement implements RiotObservable{
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

riot.class = function(element: Function) {
   var tagName;
   var template: string;
   
   // gets string template, directly or via #id
   if(Object.keys(element.prototype).indexOf("template")>=0) {
      template=element.prototype.template;
      if(template.charAt(0)=="#") {
         var elementId=template.substr(1);
         template=document.getElementById(elementId).innerHTML;      
      }
   }
   else throw "template not specified";

   // gets tag name
   if(Object.keys(element.prototype).indexOf("tagName")>=0) {
      tagName=element.prototype.tagName;
   }
   else throw "tagName property not specified"; 
   
   var transformFunction = function(opts) {
      // copies prototype into "this"
      Object.keys(element.prototype).forEach((key) => this[key]=element.prototype[key]);
      // calls class constructor applying it on "this"
      element.apply(this,[opts]);
   };

   riot.tag(tagName,template,transformFunction);   
}

                     