
module.exports = function(grunt) {

  grunt.initConfig({

    htmlConvert: {
      options: {
        base: '',
        prefix: 'Riot.templateCache = (function(){\n\n',
        suffix: '   return mytemplate;\n})();\n'     
      },
      mytemplate: {
        src: ['elements/**/*.html'],
        dest: 'elements/template-cache.js'
      },
    },
  
  });

  grunt.loadNpmTasks('grunt-html-convert');
};
