@template(`

<test1>
   <div id="inner_div">test1 element</div>
</test1>

`)
class test1 extends Riot.Element
{
   
}


@template('<test2><div id="inner_div">test2 element</div></test2>')
class test2 extends Riot.Element
{
   
}


@template("elements/test-template.html")
class test_template_from_url extends Riot.Element
{
   
}


@template("<test-no-tag><span></span></test-no-tag>")
class testNoTagName extends Riot.Element
{
   
}

@template("<test-double-register><div></div></test-double-register>")
class testDoubleRegister extends Riot.Element
{
   
}

@template("<test-lifecycle><div>this is test-lifecycle</div></test-lifecycle>")
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

@template("<test-options><div></div></test-options>")
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

@template("<test-getter><div id='inner'>getter={myval}</div></test-getter>")
class TestGetterSetter extends Riot.Element
{
   private a = 42;

   get myval()
   {
      return this.a;
   }

   set myval(v)
   {
      this.a = v;  
      this.update();       
   }
}


class TestObservable extends Riot.Observable 
{
   doSomething()
   {
      this.trigger("something-done");
   }
}

var MixinPlainObject =
{
   method1: function() { return "ok1"; }
}

class MixinClass 
{
   method2()
   {
      return "ok2";
   }
}

@template("<span></span>")
class TestMixins extends Riot.Element
{
   method1: () => void;
   method2: () => void;

   constructor()
   {
      super();
      this.mixin(MixinPlainObject);
      this.mixin(MixinClass.prototype);
   }

   check1()
   {
      return this.method1();
   }

   check2()
   {
      return this.method2();
   }
}

