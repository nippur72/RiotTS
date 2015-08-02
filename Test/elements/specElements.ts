@component("test1", '<div id="inner_div">test1 element</div>')
class test1 extends Riot.Element
{
   
}
test1.register();

@component("test2")
@template('<div id="inner_div">test2 element</div>')
class test2 extends Riot.Element
{
   
}
test2.register();

@component("test-template-from-script")
@template("elements/test-template.html")
class test_template_from_url extends Riot.Element
{
   
}
test_template_from_url.register();


@component("test-no-template")
class testNoTemplate extends Riot.Element
{
   
}

@template("<span></span>")
class testNoTagName extends Riot.Element
{
   
}

@component("test-double-register", '<div></div>')
class testDoubleRegister extends Riot.Element
{
   
}

@component("test-lifecycle", "<div>this is test-lifecycle</div>")
class test_lifecycle extends Riot.Element
{
   sequence = "";

   mounted() {
      this.sequence += "3";         
   }   

   unmounted() {
      this.sequence += "4";         
   }

   updating() {
      this.sequence += "1";         
   }

   updated() {
      this.sequence += "2";         
   }
}   

@component("test-options", "<div></div>")
class test_options extends Riot.Element
{
   bar: string;
   foo: string;

   constructor(options)
   {
      super();

      //this.bar = options.bar !== undefined ? options.bar : "default bar";
      this.bar = options.bar||"default bar";
      this.foo = options.foo||"default foo";
   }      
}   

class TestObservable extends Riot.Observable 
{
   doSomething()
   {
      this.trigger("something-done");
   }
}

