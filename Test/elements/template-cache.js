Riot.templateCache = (function(){

var mytemplate = {};

mytemplate["elements/test-template.html"] = "<test-template-from-url>\n" +
   "   <div>template from URL</div>\n" +
   "</test-template-from-url>";

mytemplate["elements/timer.html"] = "<timer>\n" +
   "   <style scoped>\n" +
   "      .bolded {\n" +
   "         font-weight: bolder;\n" +
   "         font-size: large;\n" +
   "      }\n" +
   "   </style>\n" +
   "   <div>\n" +
   "      timer: <span class=\"bolded\">{{ time }}</span><br>\n" +
   "      trasclusion is '<yield />'<br>\n" +
   "      <div each=\"{{el in mylist}}\">iterating over array item \"{{el}}\"<br></div>\n" +
   "      <div>this is from timer.html file!</div>\n" +
   "   </div>\n" +
   "</timer>\n" +
   "";
   return mytemplate;
})();
