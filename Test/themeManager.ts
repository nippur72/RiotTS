var themeManager = new (class 
{
   theme: string;
   backcolor: string;
   forecolor: string;   

   constructor() 
   {
      this.setTheme("light");
      Riot.styleParser = (css) => this.parseCss(css);      
   }

   flipTheme()
   {
      if(this.theme == "light") this.setTheme("dark");
      else this.setTheme("light");
      Riot.updateStyles();
   }

   setTheme(newTheme: string)
   {
      if(newTheme=="light")
      {
         this.backcolor = "red";
         this.forecolor = "green";
      }
      else if(newTheme=="dark")
      {
         this.backcolor = "yellow";
         this.forecolor = "blue";
      }
      else throw "unknown theme";
      this.theme = newTheme;
   }

   parseCss(css: string)
   {
      // matches all identifiers starting with dollar sign
      return css.replace(/\$([_a-zA-Z][_a-zA-Z0-9]*)/g, (a,b)=>
      {
         if(this[b]!==undefined && typeof this[b]==='string')
         {
            return this[b];
         }
         else throw `css variable "\$${b}" not found`         
      });
   }

})()

