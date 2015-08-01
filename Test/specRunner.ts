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
   describe("A jasmine spec", () => 
   {
      it("tests something",()=>
      {
         expect(!false).toBe(true);
      });
   });

   describe("@component decorator", () => {
      var instance,el;

      beforeAll(()=>
      {
         var root = querySelector('#put_here');
         el = test1.createElement();                
         root.appendChild(el);         
         instance = getClass(el);
      });

      it('creates correct element bodies', () => {
         expect(instance.inner_div.innerHTML).toBe("test element");         
      });

      it('creates elements with correct riot-tag', () => {         
         expect(instance.opts["riot-tag"]).toBe("test1");
      });

      it('creates elements with correct template', () => {         
         expect(el.innerHTML).toBe(instance.template);
      });

      // expect(implements(el, TestElement)).toBe(true);

   });
   
   // TODO: test @component(tagname,template)
   // TODO: test @template(template)
   // TODO: test template must be defined
   // TODO: test component must be defined
   // TODO: test template from URL
   // TODO: test template from script id
   // TODO: test register
   // TODO: test register twice
   // TODO: test mounted(), unmounted(), updating(), updated()
   // TODO: test object well-formed
   // TODO: test el is observable
   // TODO: test options passing

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

/*
function main() {
   riot.route((id,username) =>
   {
      console.log("hash changed to: "+id+"/"+username);
   });
   riot.route.start();
  
   riot.mount('*');

   riot.route("welcome/nino.porcino");
}
*/


/* some random tests taken from nippur72/PolymerTS

function RunSpecs()
{
   describe("@component decorator", () => {
      it('registers regular elements', () => {
         var el:any = querySelector('#testElement');
         expect(implements(el, TestElement)).toBe(true);
         expect(el["is"]).toBe(TestElement.prototype["is"]);         
         expect(el.$.inner.innerHTML).toBe("innerelement");
      });

      it('extends builtin elements using second argument', () => {
         var el = querySelector('#testInput1');
         expect(implements(el, TestInput1)).toBe(true);
      });

      it("sets 'is:' correctly", () => {
         var el1 = querySelector('#testElement');
         var el2 = querySelector('#testInput1');
         var el3 = querySelector('#testInput2');
         expect(el1["is"]).toBe(TestElement.prototype["is"]);
         expect(el2["is"]).toBe(TestInput1.prototype["is"]);
         expect(el3["is"]).toBe(TestInput2.prototype["is"]);
      });
   });

   describe("custom constructor", () =>
   {
      var elementConstructor, el;

      beforeEach(() =>
      {
         // create the element                  
         el = CustomConstructorTest.create("42");         
         
         // connect it to DOM         
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar == "42"));

      it("provides custom initialization", () =>
      {
         expect(el.bar).toBe("42");
      });         
   });

   describe("constructor()", () => {
      var el;

      beforeEach(() => {
         // create the element
         el = PropertyInitializationTest.create();

         // connect it to DOM
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar == "mybar"));

      it("initializes properties correctly", () => {
         expect(el.bar).toBe("mybar");
         expect(el.foo).toBe("myfoo");
         expect(el.war).toBe("mywar");
      });
   });

   describe("polymer.Base", () => {
      it("doesn't allow an element to be used before it's registered", () => {
         expect(()=>UnInitializedTest.create()).toThrow("element not yet registered in Polymer");
      });

      it("doesn't allow an element to be registered twice", () => {
         expect(() => DoubleInitializationTest.register() ).not.toThrow();
         expect(() => DoubleInitializationTest.register() ).toThrow("element already registered in Polymer");                  
      });

      it("create elements that are extensions of HTMLElement", () => { 
         var el = DoubleInitializationTest.create();                 
         expect(implements(el, HTMLElement)).toBe(true);
      });

      it("create elements that are extensions Polymer.Base", () => {
         var el=DoubleInitializationTest.create();
         expect(implements(el, Polymer.Base)).toBe(true);
      });

      it("does not allow to redefine factoryImpl()", () => {
         expect(() => NoFactoryImplTest.register()).toThrow("do not use factoryImpl() use constructor() instead");
      });      
   });

   describe("@template/@style decorators", () => {
      var el;

      beforeEach(() => {         
         el = TemplateTest.create();         
         querySelector("#put_test_elements_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("provide a template for the element", () => {         
         expect(el.$.inner.innerHTML).toBe("inner text");
      });
      
      it("provide a style for the element", () => {        
         expect(el.$.inner.clientWidth).toBe(50);
      });
   });

   describe("@hostAttributes decorator", () => {
      var el;

      beforeEach(() => {
         el=HostAttributesTest.create();
         querySelector("#put_test_elements_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("sets attributes on the host element", () => {
         expect(el.style.color).toBe("red");
      });
   });

   describe("element class", () => {
      var el: ExtendedElementTest;

      beforeEach(() => {
         el = <any> ExtendedElementTest.create();
         querySelector("#put_test_elements_here").appendChild(<any> el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("can be extended with 'extends'", () => {
         expect(el.prop).toBe("AB");
      });

      it("can be mixed with TypeScript mixins", () => {
         expect(el.pmix).toBe("C");
      });
   });
}
*/



                     