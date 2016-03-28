// Gruntfile.js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // MONGO TASKS ================================================================
    // launch a project specific mongodb instance
    // don't forget to create data/db folder and to add it to gitignore
    shell: {
        mongodb: {
          command: 'mongod --dbpath data/db',
          options: {
              async: true
          }
        }
    },

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'server/**/*.js', 'client/src/js/**/*.js', 'client/src/js/*.js']
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'client/dist/js/app.min.js': ['client/src/js/**/*.js', 'client/src/js/*.js']
        }
      },
      options: {
        mangle: false
      },
    },

    // CSS TASKS ===============================================================
    // process the less file to style.css
    less: {
      build: {
        files: {
          'client/src/css/style.css': ['client/src/css/reset.less', 'client/src/css/app.less']
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'client/dist/css/style.min.css': 'client/src/css/style.css'
        }
      }
    },

    // AUTO RERUN TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['client/src/css/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['client/src/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.registerTask('default', ['shell', 'less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};
