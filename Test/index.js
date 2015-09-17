/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function main() {
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
var myel = (function (_super) {
    __extends(myel, _super);
    function myel() {
        _super.apply(this, arguments);
    }
    myel = __decorate([
        template("\n<myel>\n   <child-tag data={ \\{ a:3 \\} }></child-tag>\n</myel>\n")
    ], myel);
    return myel;
})(Riot.Element);
myel.register();
var ChildTag = (function (_super) {
    __extends(ChildTag, _super);
    function ChildTag() {
        _super.apply(this, arguments);
    }
    ChildTag = __decorate([
        template("<child-tag>{ JSON.stringify(opts) }</child-tag>")
    ], ChildTag);
    return ChildTag;
})(Riot.Element);
ChildTag.register();
//# sourceMappingURL=index.js.map