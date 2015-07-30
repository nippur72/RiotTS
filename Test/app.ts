function main() {
   riot.route((id,username) =>
   {
      console.log("hash changed to: "+id+"/"+username);
   });
   riot.route.start();

   riot.class(Timer);
   riot.mount('*');

   riot.route("welcome/nino.porcino");
}



                     