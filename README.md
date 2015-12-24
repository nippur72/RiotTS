# RiotTS

Use Muut's [Riot.js](https://muut.com/riotjs/) minimalistic framework from TypeScript.

# Table of contents

- [Installation](#install)
- [How to write elements](#howtowrite)
- [How to correctly reference in markup](#howtoreference)
- [The @template decorator](#template)
- [Tag initialization](#init)
- [Lifecycle events shortcuts](#lifecycle)
- [How to create elements programmatically](#creating)
- [Observables](#observables)
- [Router](#router)
- [Examples](#examples)
   - [A timer-based counter element](#timer_example) 
- [Precompiled tags](#precompiled)  
- [Dynamic CSS](#dynamiccss)
- [Known issues](#knownissues)
- [Contributing](#contributing)
- [Changelog](#changelog)

# Installation <a name="install"></a>

Install via bower:
```
bower install --save riot-ts
```

This will also install `riot.js`.

You'll get the following files in `bower_components\riot-ts`:
- `riot-ts.js` the JavaScript file to load via `<script src="">`
- `riot-ts.min.js` as above, minified
- `riot-ts.d.ts` the file to reference in your TypeScript code (`/// <reference path="...">`)
- `riot-ts.ts` the source TypeScript file for debugging purposes

# How to write elements <a name="howtowrite"></a>

Differently from pure [Riot.js](https://muut.com/riotjs/), in RiotTS elements are written 
as TypeScript classes extending the base type `Riot.Element`. 

There are no external `.tag` files, HTML templates are defined as pure strings or are loaded from `.html` files.

In brief:

- Write elements as TypeScript classes
- Extend the `Riot.Element` class 
- Use `@template` to define the template string or load it from URL

A class-element:
- can have private properties/fields
- can have getter/setter properties
- can use inherited properties and methods
- can use TypeScript Mixins

# How to correctly reference in markup <a name="howtoreference"></a>

In the `head` section of your main .html file:

```HTML
<head>
   <!-- loads riot and riot-ts -->
   <script type="text/javascript" src="bower_components/riot/riot.js"></script>        
   <script type="text/javascript" src="bower_components/riot/compiler.js"></script>        
   <script type="text/javascript" src="bower_components/riot-ts/riot-ts.js"></script>   

   <!-- custom elements -->
   <script type="text/javascript" src="elements/my-element.js"></script>      

   <!-- your application -->
   <script src="myapp.js"></script>            
</head>
```

In your element TypeScript code (e.g. `elements/my-element.ts`):

```TypeScript
@template("my-element.html")
class MyElement extends Riot.Element
{
   // ...
}
```

In `elements/my-element.html`:

```HTML
<my-element>
   <div>
      This is a my custom element
   </div>
</my-element>
```

In your main application file:

```TypeScript
/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />

//...

riot.mount('*');
```

# The @template decorator <a name="template"></a>

```
@template(param)
```

Sets the template for the element. The template parameter can be either:

- a literal string e.g. `"<my-hello><div>hello</div></my-hello>"`
- an external file (usually a `.html`) to be loaded via HTTP.

Example of an element `<my-hello>`:
 
```TypeScript
@template("<my-hello><div>hello</div></my-hello>")
class MyHello extends Riot.Element
{
}
```

or

```TypeScript
@template("elements/my-hello.html")
class MyHello extends Riot.Element
{
}
```
```
<my-hello>
   <div>hello</div>
</my-hello>
```
External tag files are loaded via HTTP requests, which can slow down the startup of very large applications. To avoid this, tags can be precompiled and concatenated into a single javascript file to be loaded more quickly. See how to setup [a grunt task that does this](#precompiled).   

# Tag initialization <a name="init"></a>

When a tag instance is created, `constructor(opts)` is called allowing to perform all the required 
initializations before the tag is mounted on the DOM. The parameter `opts` contains the tag 
attributes specified in the markup or passed programmatically via `riot.mount(tagname, opts)`.

The implementation of `constructor()` requires a call to `super()` as per ES6 specification. If you
want to make it short, write your constructor as `init(opts)` which is a short-hand for the constructor 
that does not requires a call to `super()`. Example:
```TypeScript
@template("<myel></myel>")
class MyEl extends Riot.Element {
   init(ops) {
      // initializations here
   }
}
```

# Lifecycle events shortcuts <a name="lifecycle"></a>

Lifecycle events can be listened via `this.on()` or by defining the following methods in the class:

- `mounted()` for the `mount` event
- `unmounted()` for the `unmount` event
- `updating()` for the `update` event
- `updated()` for the `updated` event

Note: names ending in "-ed" have been choosen to not clash with already methods on the `Riot.Element` interface.

Example:

```TypeScript
@template("<myel><span></span></myel>")
class MyEl extends Riot.Element {
   constructor(opts) {      
      super();
      
      // first way to listen to unmount event
      this.on("unmount",()=>
      {         
      });
   }
      
   // alternated shorter way 
   unmounted()   
   {               
   }
}
```

# How to create elements programmatically <a name="creating"></a>

To create an element to be attached to the DOM use the `creaeElement(opts)` method:

```TypeScript
var root = querySelector('#put_here');
el = test1.createElement();                
root.appendChild(el);         
```

The created element is an instance of `HTMLElement`. To access the related riot-element:

```
var riotel = (el as any)._tag;  // ._tag is undocumented
```

# Observables <a name="observables"></a>

The Riot library lets you define `Observable` objects that are not UI elements:
```TypeScript
class MyObservable extends Riot.Observable 
{
   doSomething()
   {
      this.trigger("something-done");
   }
}

var a = new MyObservable();

a.on("something-done", ()=> {
   console.log("something has been done on 'a'!");
});
```

# Router <a name="router"></a>

The Riot library comes also with a minimalistic router, the API is the same also in TypeScript.

Example:

```TypeScript
// install router hash changed function
riot.route((id,username) =>
{
   console.log(`hash changed to: id=${id} username=${username}`);
});

// start the router
riot.route.start();

// route to an address
riot.route("welcome/nino.porcino");

// stop the router
riot.route.stop();
```

# Examples <a name="examples"></a>

### A timer-based counter element <a name="timer_example"></a>
```TypeScript
@template(`
<timer>
   <div>
      timer: { time }<br>
      trasclusion is '<yield/>'<br>                 
      <div each="{el in mylist}">iterating over array item "{el}"<br></div>
   </div>
</timer>`)

class Timer extends Riot.Element {
   time: number;
   timerHandle: number;  

   mylist = ["one","two","three"];
   
   // initializes the element with opts
   constructor(opts) {      
      super();
      this.time=opts.time||0;
      this.timerHandle=setInterval(() => this.ticks(),1000);      
   }
      
   ticks() {
      this.time++;
      this.update();  // refreshes the element
   }

   // handles the unmount event 
   unmounted()   
   {         
      clearInterval(this.timerHandle);
   }
}
```

Then install the element and mount on the page with:

```TypeScript
riot.mount('*');   // mounts all elements
```

# Precompiled tags <a name="precompiled"></a>

To speed up application startup times, tags can be precompiled 
in order to avoid compiling them at runtime.

Precompiled tags can be also concatenated into a single JavaScript file, 
avoiding to raise an HTTP request for each tag.

RiotTS can be switched to use precompiled files very easily by 
just including them (via `<script src="..."></script>`).

If the precompiled file is included, RiotTS will just use it, otherwise
it will load tags via HTTP and compile them at runtime.

Precompiled files are suggested for production, during development
it's better to turn them off in order to avoid continually refreshing
the precompiled file.

Precompiled files are generated with the grunt task `grunt-riotts-precompile`.

How to setup the task:

- First install `grunt-cli`, `grunt` and `grunt-riotts-precompile`:
```
$ npm install -g grunt-cli
$ npm install grunt --save-dev
$ npm install grunt-riotts-precompile --save-dev
```
- Use a `Gruntfiles.js` like this:

```JavaScript
module.exports = function(grunt) {
  grunt.initConfig({    
    // reads all tags in "elements/" and writes to "precompiled-tags.js"
    precompileTags: {
        src: ['elements/**/*.html'],
        dest: 'precompiled-tags.js'
    }  
  });
  
  grunt.registerTask('default', ['precompileTags']);  
  grunt.registerTask('off', ['precompileTags:off']);
  
  grunt.loadNpmTasks('grunt-riotts-precompile');
};
```
How to run the task according to the above `Gruntfiles.js`:

- from the command line, use `grunt` to create the precompiled file (`precompiled-tags.js`)
- use `grunt off` to turn off precompilation (will empty `precompiled-tags.js`)
  
The generate `precompiled-tags.js` file can be inlined with a `<script>` tag 
just before loading the element's code, e.g.:
```HTML
   <script type="text/javascript" src="precompiled-tags.js"></script>
   <script type="text/javascript" src="elements/mytag.js"></script>
```
Precompiled tags can be easily turned off by just commenting the inclusion:
```HTML
   <!-- <script type="text/javascript" src="precompiled-tags.js"></script> -->
   <script type="text/javascript" src="elements/mytag.js"></script>
```
or by just emptying the file `precompiled-tags.js`.

# Dynamic CSS <a name="dynamiccss"></a>

With RiotTS it's possible to process CSS styles dynamically at runtime, by the use
of a style parsing function. CSS parsing allows a greater control over application 
styling (e.g. easy theme switching).

To enable runtime CSS parsing, just define a parsing function in `Riot.styleParser`.

The function definition must be done before the definition of any tag to avoid unparsed
styles being injected in the DOM.

Once the style parsing function has been defined, styles can be parsed and updated 
simply calling `Riot.updateStyles()`.

Example:
```HTML
<style>
.mytheme { 
   color: var(mycolor)
}
<style>
```
```typescript
mycolor = "red";
Riot.styleParser = function(css) { return css.replace(/var(mycolor)/g, mycolor) }

// ... later in the app ...
mycolor = "yellow";
Riot.updateStyles();
```

See `Test/themeManager.ts` for a complete example of a theme switching class that uses CSS runtime parsing.

# Known issues <a name="knownissues"></a>

- none (at the moment)

# Contributing <a name="contributing"></a>

Contributions are welcome.

If you find bugs or want to improve it, just send a pull request.

# Change log <a name="changelog"></a>
- v0.1.0
  - switched to [Semver](http://semver.org) version numbers
  - alternate syntax `init(opts)` in place of `constructor(opts)`
  - added type for `riot.util.errorHandler`
  - added runtime parsing of CSS (`Riot.styleParser`, `Riot.updateStyles()`)
  - aligned to Riot v2.4.0
- v0.0.22
  - removed the need for registration, `.register` and `.registerAll` are now removed from the API
- v0.0.21
  - aligned router API to riot v2.3.11
- v0.0.19
  - support for precompiled tags
  - deprecated support for "template-cache" in favor of precompiled tags
- v0.0.18
  - aligned with Riot's v2.3.11 API
  - for old Riot v2.2, use RiotTS v0.0.17
- v0.0.17
  - support for template-cache
- v0.0.16
  - added `Riot.registerAll()` 
- v0.0.15
  - support for riot builtin mixins
- v0.0.11
  - support for property getter/setter
- v0.0.8
   - new @template syntax, @component syntax obsolete
- v0.0.6
   - deprecated loading templates from named tags
- v0.0.5
   - addded method `createElement()`
- v0.0.0 to v0.0.4
   - early experimental versions 
