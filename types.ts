export interface Router {
   (callback: Function): void;
   (filter: string, callback: Function): void;
   (to: string, title?: string);                       

   create(): Router;
   start(autoExec?: boolean);
   stop();
   exec();
   query(): any;

   base(base: string);
   parser(parser: (path: string)=>string, secondParser?: Function );
}   

export interface CompilerResult {
   tagName: string; 
   html: string; 
   css: string; 
   attribs: string;
   js: string;
}      

export interface Settings {
   brackets: string;      
}

