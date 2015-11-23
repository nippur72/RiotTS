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

      this.on("unmount",() => {         
         clearInterval(this.timerHandle);
      });
   }

   get aprop()
   {
      return this.time+1;
   }
      
   ticks() {
      this.time++;
      this.update();
   }

   mounted()
   {
      //console.log("timer has been mounted");    
   }

   unmounted()
   {
      //console.log("timer has been unmounted");   
   }

   updating()
   {
      //console.log("timer is going to be updated");      
   }

   updated()
   {
      //console.log("timer has been updated");      
   }
}



