# RiotTS

Use Muut's [Riot.js](https://muut.com/riotjs/) minimalistic framework from TypeScript.

# Table of contents

- [Installation](#install)
- [Supported features](#features)
- [How to write elements](#howtowrite)
- [How to correctly reference in markup](#howtoreference)
- [Decorators explained](#decorators)
- [Lifecycle events shortcuts](#lifecycle)
- [Observables](#observables)
- Router
- [Examples](#examples)
   - [A timer-based counter element](#timer_example)   
- [Running the tests](#repoexample)
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

# Supported features <a name="features"></a>

- write elements as ES6 classes
- `@component(tagName)` sets component's name 
- `@template(name)` sets template from string or URL
- `className.register()` registers the element in Riot
- class constructor receives `options` as parameter

# How to write elements <a name="howtowrite"></a>

Differently from pure [Riot.js](https://muut.com/riotjs/), in RiotTS elements are written 
as TypeScript classes extending the type `Riot.Element`. 

There are no external `.tag` files, HTML templates are defined as pure strings or are loaded from `.html` files.

In brief:

- Write elements as TypeScript classes
- Extend the `Riot.Element` class 
- Use `@component` to define the tag's name
- Use `@template` set the template string or load it from URL
- register the element in riot via `className.register()`.

A class-element:
- can have private properties/fields
- can use inherited properties and methods
- can use TypeScript Mixins
- `options` are passed to the class constructor

# How to correctly reference in markup <a name="howtoreference"></a>

In the `head` section of your main .html file:

```HTML
<head>
   <!-- loads riot and riot-ts -->
   <script type="text/javascript" src="bower_components/riot/riot.js"></script>        
   <script type="text/javascript" src="bower_components/riot-ts/riot-ts.js"></script>   

   <!-- custom elements -->
   <script type="text/javascript" src="elements/my-element.js"></script>      

   <!-- your application -->
   <script src="myapp.js"></script>            
</head>
```

In your element TypeScript code (e.g. `elements/my-element.ts`):

```TypeScript
@component("my-element")
@template("my-element.html")
class MyElement extends Riot.Element
{
   // ...
}

// after the element is defined, we register it in Riot
MyElement.register();
```

In `elements/my-element.html`:

```HTML
<!-- notice there is no <my-element> tag -->
<div>
   This is a my custom element
</div>
```

In your main application file:

```TypeScript
/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />

//...

riot.mount('*');
```

# Decorators explained <a name="decorators"></a>

### @component(tagName[,template]) <a name="component"></a>

Sets the tag name of the custom element. The decorator is applied on the `class` keyword.  

The *template* parameter is optional and equivalent to the `@template` decorator.

Example of a `<my-element>`:
 
```TypeScript
@component("my-element","my-element.html")
class MyElement extends Riot.Element
{
}
```

### @template(param) <a name="template"></a>

Sets the template for the element. The template parameter can be either:

- a literal string e.g. `"<div>hello</div>"`
- an external file ending in `.html` to be loaded syncronously
- a script tag identifier (e.g. `"#temp"` will look for `<script id="temp">`)

Example of a `<my-element>`:
 
```TypeScript
@component("my-element")
@template("<div>Hello</div>")
class MyElement extends Riot.Element
{
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
@component("myel","<span></span>")
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

# Examples <a name="examples"></a>

### A timer-based counter element <a name="timer_example"></a>
```TypeScript
@component("timer")

@template(`<div>
             timer: { time }<br>
             trasclusion is '<yield/>'<br>                 
             <div each="{el in mylist}">iterating over array item "{el}"<br></div>
           </div>`)

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
Timer.register();

riot.mount('*');   // mounts all elements
```

# Running the tests <a name="repoexample"></a>

To run the "Test" project containing the Jasmine specs:

- clone this repo `nippur72/RiotTS`
- go to the `Test` directory
- run `bower update`
- Open the solution in Visual Studio and run the "Test" project.

# Known issues <a name="knownissues"></a>

- none (at the moment)

# Contributing <a name="contributing"></a>

Contributions are welcome.

If you find bugs or want to improve it, just send a pull request.

# Change log <a name="changelog"></a>

- v0.0.0 to v0.0.4
  - early experimental versions 
