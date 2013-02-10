/*
    
  Grunt Project Kickstater
    
-----------------------------------------------
31st Jan, 2013
@beaucharman, http://beaucharman.me
npm install -g grunt-cli
npm install grunt@0.4.0a --save-dev
----------------------------------------------- */
module.exports = function(grunt) {

  /* Project configuration
  ----------------------------------------------- */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    /* SASS 
    -----------------------------------------------  
    npm install grunt-contrib-sass --save-dev  
    ----------------------------------------------- */
    sass: 
    {
      dist: 
      {
        files:
        {
          'application/public/library/styles/main.css':'application/sass/main.scss'
        },
        options: {                     
          style: 'compressed'
        }  
      }
    }, 
    
    /* Coffee 
    -----------------------------------------------  
    npm install grunt-contrib-coffee 
    ----------------------------------------------- */
    coffee: {
      compile: {
        files: {
          'application/public/library/scripts/main.js': 'application/coffee/source.coffee'
        }
      },
      flatten: {
        options: {
          flatten: true
        },
        files: {
          'application/public/library/scripts/*.js': 'application/coffee/*.coffee'
        }
      }
    },
    
    /* Image Min 
    ----------------------------------------------- 
    npm install grunt-contrib-imagemin
    ----------------------------------------------- */
    imagemin: {                          
      dist: {                            
        options: {                       
          optimizationLevel: 7 
        },
        files: {                         
          // List 'src/image/name:destination/image/name' pairs here
        }
      }
    },
    
    /* FTP Deploy 
    -----------------------------------------------
    Store ftp connection details in a .ftppass file
    ----------------------------------------------- */
    "ftp-deploy": {
      build: {
        auth: {
          host: "",
          port: 21,
          authKey: ""
        },
        src: "",
        dest: "public_html",
        exclusions: ["**/.DS_Store", "**/Thumbs.db"]
      }
    },
    
    /* Watch Task 
    -----------------------------------------------
    npm install grunt-contrib-watch --save-dev
    -----------------------------------------------*/
    watch:
    {
      sass: {
        files: ['application/sass/*'],
        tasks: ['sass'],
        options: {
          interrupt: true
        }
      }
    },
    
    /* Copy Files
    -----------------------------------------------
    npm install grunt-contrib-copy
    -----------------------------------------------*/
    copy: {
      dist: {
        files: {
         // "application/public/wordpress/wp-content/themes/wordpress-theme": "application/source/wordpress-theme/**"
        }
      }
    }

  });
  
  /* Load Tasks 
  ----------------------------------------------- */
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  
  /* Register Tasks
  ----------------------------------------------- */
  grunt.registerTask('default', ['sass', 'imagemin', 'ftp-deploy']);
  
};