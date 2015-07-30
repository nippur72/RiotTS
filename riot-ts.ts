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

/* String.prototype.endsWith polyfill */
interface String {
   endsWith(s: string, position?: number): boolean;    
}

if (!String.prototype.endsWith) {
   String.prototype.endsWith = function (searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
         position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
   };
}

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
      else if (template.endsWith(".html")) {
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

                     