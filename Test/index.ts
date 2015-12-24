
function startIndex() 
{      
   window.onload = () =>
   {   
      riot.util.errorHandler = function(err) {
         console.log(`${err} in ${err.riotData.tagName}`);
      }

      riot.mount('*');
   }
}



