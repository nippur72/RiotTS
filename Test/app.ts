/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />

function main() {
   riot.route((id,username) =>
   {
      console.log("hash changed to: "+id+"/"+username);
   });
   riot.route.start();
  
   riot.mount('*');

   riot.route("welcome/nino.porcino");
}



                     