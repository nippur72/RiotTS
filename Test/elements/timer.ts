@component("timer")

@template("elements/timer.html")

class Timer extends Riot.Element 
{
   time: number;   
   mylist = ["one", "two", "three"];

   private timerHandle: number;  
   
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
                     