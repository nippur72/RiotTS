# RiotTS

This repo allows you to use [Riot.js](https://muut.com/riotjs/) v2.0 from TypeScript.

I have NOT published it on [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) yet, so to use it, just get the file `riot-ts.ts` and include in your TypeScript projects.

If you find bugs or want to improve it, just send me a pull request.

To run the very small example contained in the repo, clone it and install Riot
via node `npm` (it should create a folder called `node_modules`). 

Then open in Visual Studio and run it.

## How to use it

Differently from pure RiotJs, elements are defined as TypeScript classes extending the type `RiotElement`. There are no external .tag files, HTML templates are defined as pure strings within the class itself.

A simple timer example:

```TypeScript
class Timer extends RiotElement {
   time: number;
   timerHandle: number;  
   mylist=["one","two","three"];
   
   // returns template string
   get template() {
      return `<div>
                 timer: { time }<br>
                 trasclusion is '<yield/>'<br>                 
                 <div each="{el in mylist}">iterating over array item "{el}"<br></div>
              </div>`;
   }

   // returns tag name
   get tagName() {
      return "timer";
   }

   // initializes the element with opts
   constructor(opts) {      
      super();
      this.time=opts.time||0;
      this.timerHandle=setInterval(() => this.ticks(),1000);      

      // handles the unmount event
      this.on("unmount",() => {         
         clearInterval(this.timerHandle);
      });
   }
      
   ticks() {
      this.time++;
      this.update();  // refreshes the element
   }
}
```

Then install the element and mount on the page with:

```TypeScript
riot.class(Timer);
riot.mount('*');   // mounts all elements
```