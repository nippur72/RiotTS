/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="typings/jasmine/jasmine.d.ts" />

// jasmine boot.js links to window.onload 
var startJasmine = window.onload;
window.onload = (e) =>
{              
   riot.mount('*');
   RunSpecs();   
   startJasmine(null);
};

// simulates the old Jasmine 1.3 waitsFor()
function waitFor(F)
{
   beforeEach((done) => {
      setInterval(() => {
         if(F()) done();
      }, 250);
   });        
}

function querySelector(s)
{
   return document.querySelector(s);
}

function getClass(el)
{
   return (el as any)._tag;
}

// quickly checks if instance implements the class 
function implements(instance: Object, classFunction: Function)
{
   var instanceMembers = {};
   for(var i in instance) instanceMembers[i] = true;

   var classMembers = [];
   for(var i in classFunction.prototype) classMembers.push(i);

   for(var t=0; t<classMembers.length; t++)
   {
      if(instanceMembers[classMembers[t]]===undefined)
      {
         return false;
      }
   }   
   return true;
}

function RunSpecs()
{   
   describe("Element creation", () => {
      var instance,el;

      beforeAll(()=>
      {
         var root = querySelector('#put_here');
         el = test1.createElement();                
         root.appendChild(el);         
         instance = getClass(el);
      });

      it('creates correct element bodies', () => {
         expect(instance.inner_div.innerHTML).toBe("test1 element");         
      });

      it('creates elements with correct riot-tag', () => {         
         expect(instance.opts["riot-tag"]).toBe("test1");
      });

      it('creates elements with correct template', () => {         
         expect(el.innerHTML).toBe('<div id="inner_div">test1 element</div>');
      });

      // expect(implements(el, TestElement)).toBe(true);

   });
   
   describe("@template decorator", () => {
      var instance,el;
      var instance1,el1;

      beforeAll(()=>
      {
         var root = querySelector('#put_here');
         el = test2.createElement();                
         root.appendChild(el);         
         instance = getClass(el);

         el1 = test_template_from_url.createElement();                
         root.appendChild(el1);         
         instance1 = getClass(el1);
      });

      it('creates correct element bodies', () => {
         expect(instance.inner_div.innerHTML).toBe("test2 element");         
      });

      it('creates elements with correct template', () => {         
         expect(el.innerHTML).toBe('<div id="inner_div">test2 element</div>');
      });

      it('can load templates from .html files', () => {         
         expect(el1.innerHTML).toBe("<div>template from URL</div>");
      });      
   });

   describe("register()", () => {
      /*
      it('throws an error if no tag name is specified', () => {                  
         expect(()=>testNoTagName.register()).toThrow("tagName property not specified");
      });
      */

      it('throws an error if no template is specified', () => {                  
         expect(()=>testNoTemplate.register()).toThrow("template property not specified");
      });

      /*
      it('throws an error if registered twice', () => {    
         expect(()=>testDoubleRegister.register()).not.toThrow();
         expect(()=>testDoubleRegister.register()).toThrow();
      });
      */
   });

   // TODO: test object well-formed
   // TODO: test el is observable

   describe("lifecycle helper methods", () => {
      var el, instance: test_lifecycle;

      beforeAll(()=>
      {
         var root = querySelector('#put_here');
         test_lifecycle.register();
         el = test_lifecycle.createElement();                
         root.appendChild(el);         
         instance = getClass(el);
         instance.unmount();
      });

      waitFor(()=>instance.sequence!="");

      it('are executed, all in the correct order', () => {                  
         expect(instance.sequence).toBe("1234");
      });
   });

   describe("createElement()", () => {
      var el1, el2, el3, 
          i1: test_options, 
          i2: test_options, 
          i3: test_options;

      beforeAll(()=>
      {
         var root = querySelector('#put_here');
         test_options.register();

         el1 = test_options.createElement();                
         el2 = test_options.createElement({bar: "BAR"});                
         el3 = test_options.createElement({bar: "BAR", foo: "FOO"});                         

         root.appendChild(el1);         
         root.appendChild(el2);         
         root.appendChild(el3);         
         i1 = getClass(el1);
         i2 = getClass(el2);
         i3 = getClass(el3);
      });     

      it('works with no parameter specified', () => {                  
         expect(i1.bar).toBe("default bar");
         expect(i1.foo).toBe("default foo");
      });

      it('works with partial parameter specified', () => {                  
         expect(i2.bar).toBe("BAR");
         expect(i2.foo).toBe("default foo");
      });

      it('works with full parameter specified', () => {                  
         expect(i3.bar).toBe("BAR");
         expect(i3.foo).toBe("FOO");
      });
   });

   describe("Observable", () =>
   {
      var eventRaised = false;

      beforeAll(()=>
      {
         var obs = new TestObservable();

         obs.on("something-done", ()=> 
         {
            eventRaised = true;   
         });

         obs.doSomething();
      });

      waitFor(()=>eventRaised);

      it("can be observed for its events",()=>   
      {
         expect(eventRaised).toBe(true);      
      });
   });   
}
                     
