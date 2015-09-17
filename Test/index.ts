/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />

function main() 
{   
   /*
   var b = document.body;
   b.innerHTML = b.innerHTML + " ";
   */

   riot.mount('*');
}

riot.settings.brackets = "{ }";

/*
@template(`
<my-bool>
   <div>
      The content of selected is '{{JSON.stringify(opts)}}'
   </div>
</my-bool>
`)    

class mybool extends Riot.Element
{
   constructor(opts)
   {
      super();      
      console.log(JSON.stringify(opts));
   }
}

mybool.register();
*/

/*
@template(`
<my-app>
   <yield>
</my-app>
`)    

class myapp extends Riot.Element
{
   constructor(opts)
   {
      super(); 
   }
}

myapp.register();


@template(`
<myli>
   <span>[<yield>]</span>
</myli>
`)    

class myli extends Riot.Element
{
   constructor(opts)
   {
      super(); 
   }

   mounted()
   {
      var s = this.root.outerHTML = "<li></li>";
      this.root.outerHTML = s;
   }
}

myli.register();
*/

/*
var old_create:any    = document.createElement.bind(document);
var old_create_ns:any = document.createElementNS.bind(document);

(document as any).createElement = function(tag)
{
   console.log(tag);
   if(tag=="myli") return old_create("li");   
   return old_create(tag);
}

function createElementNS(namespace, tag) {
   console.log(tag);
   return old_create_ns(namespace,tag);
}                     
*/


@template(`
<myel>
   <child-tag data={ \\{ a:3 \\} }></child-tag>
</myel>
`)

class myel extends Riot.Element
{
    
}

myel.register();

@template(`<child-tag>{ JSON.stringify(opts) }</child-tag>`)

class ChildTag extends Riot.Element
{
    
}
ChildTag.register();

