class Timer extends Riot.Element {
   time: number;   
   mylist = ["one", "two", "three"];

   private timerHandle: number;  
   
   get template() {
      return "elements/timer.html";      
   }

   get tagName() {
      return "timer";
   }

   constructor(opts) {      
      super();
      this.time=opts.time||0;
      this.timerHandle=setInterval(() => this.ticks(),1000);      

      this.on(Riot.Events.unmount,() => {         
         clearInterval(this.timerHandle);
      });
   }
      
   ticks() {
      this.time++;
      this.update();
   }
}
                     