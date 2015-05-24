class Timer extends RiotElement {
   time: number;
   timerHandle: number;  
   mylist=["one","two","three"];
   
   get template() {
      return `<div>
                 timer: { time }<br>
                 trasclusion is '<yield/>'<br>                 
                 <div each="{el in mylist}">iterating over array item "{el}"<br></div>
              </div>`;
   }

   get tagName() {
      return "timer";
   }

   constructor(opts) {      
      super();
      this.time=opts.time||0;
      this.timerHandle=setInterval(() => this.ticks(),1000);      

      this.on(RiotEvents.unmount,() => {         
         clearInterval(this.timerHandle);
      });
   }
      
   ticks() {
      this.time++;
      this.update();
   }
}
                     