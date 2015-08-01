@component("test1", '<div id="inner_div">test element</div>')
class test1 extends Riot.Element
{
   
}
test1.register();



class TestObservable extends Riot.Observable 
{
   doSomething()
   {
      this.trigger("something-done");
   }
}

