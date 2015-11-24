
module.exports = function(grunt) {

  grunt.initConfig({
    
    // reads all tags in "elements/" and writes to "precompiled-tags.js"
    precompileTags: {
        src: ['elements/**/*.html'],
        dest: 'precompiled-tags.js'
    }
  
  });
  
  grunt.registerTask('default', ['precompileTags']);  
  grunt.registerTask('clean', ['precompileTags:off']);
  
  grunt.loadNpmTasks('grunt-riotts-precompile');

};
