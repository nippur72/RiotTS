@template("elements/dynamic-css.html")
class DynamicCssTag extends Riot.Element
{
   /*
   constructor(opts)
   {
      super();

      this.on("all", (eventName)=>
      {
         console.info(eventName)
      })
   }
   */ 

   /*
   init(opts)
   {
      console.log(this.isMounted);
      this.on("all", (eventName)=>
      {
         console.info(eventName)
         console.log(this.isMounted)
      })
   }
   */

   handleFlipTheme(e)
   {
      themeManager.flipTheme();   
   }
}

