# RiotTS

This repo allows you to use [Riot.js](https://muut.com/riotjs/) from TypeScript.

If you find bugs or want to improve it, just send me a pull request.

## How to use it

Differently from pure RiotJs, elements are defined as TypeScript classes extending the type `Riot.Element`. 

There are no external `.tag` files, HTML templates are defined as pure strings within the class itself.

A simple timer example:

```TypeScript
@component("timer")

@template(`<div>
             timer: { time }<br>
             trasclusion is '<yield/>'<br>                 
             <div each="{el in mylist}">iterating over array item "{el}"<br></div>
           </div>`)

class Timer extends RiotElement {
   time: number;
   timerHandle: number;  
   mylist=["one","two","three"];
   
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
Timer.register();

riot.mount('*');   // mounts all elements
```