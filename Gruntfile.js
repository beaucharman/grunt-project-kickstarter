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
    
    meta: {
      name: 'Grunt Project Kickstater'
    },
    
    /* SASS 
    -----------------------------------------------  
    npm install grunt-contrib-sass --save-dev  
    ----------------------------------------------- */
    sass: 
    {
      development: 
      {
        files:
        {
          'application/public/static/library/styles/main.css':'application/source/sass/main.scss'
        },
        options: {                     
          style: 'expanded'
        }  
      },
      production: 
      {
        files:
        {
          'application/public/static/library/main.css':'application/source/sass/main.scss'
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
      development: {
        compile: {
          files: {
            'application/public/static/library/scripts/main.js': 'application/source/coffee/main.coffee'
          }
        }
      }
    },
    
    /* Image Min 
    ----------------------------------------------- 
    npm install grunt-contrib-imagemin
    ----------------------------------------------- */
    imagemin: {                          
      development: {                            
        options: {                       
          optimizationLevel: 3
        },
        files: {                         
          'application/source/images/imagename.png': 'application/public/static/library/images/imagename.png'
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
          host: "ftp.website.com",
          port: 21,
          authKey: "keyname"
        },
        src: "application/production/",
        dest: "public_html/",
        exclusions: ["**/.DS_Store", "**/Thumbs.db"]
      }
    },
    
    /* Copy Files
    -----------------------------------------------
    To be used with WordPress theme development and/ or
    moving development files to production
    npm install grunt-contrib-copy
    -----------------------------------------------*/
    copy: {
      production: {
        files: {
          "application/production/": "application/development/**"
        }
      },
      wordpress: {
        files: {
          "path/to/wordpress/theme/from/this/file": "application/development/**"
        }
      }
    },
    
    /* Jekyll Task 
    -----------------------------------------------
    npm install grunt-jekyll
    -----------------------------------------------*/    
    jekyll: {
      server: {
        src: 'application/source/jekyll/',
        dest: 'application/development/',
        src :        'application/jekyll',
        dest:        'application/public',
        auto:        true,
        server:      true,
        server_port: 4000,
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      }
    },
    
    /* Watch Task 
    -----------------------------------------------
    npm install grunt-contrib-watch --save-dev
    -----------------------------------------------*/
    /*
    watch: {
      sass: {
        files: ['application/source/sass/**'],
        tasks: ['sass'],
        options: {
          interrupt: true
        }
      }
    },
    */
    
    /* Regarde Watch Task 
    -----------------------------------------------
    Alternate to the above watch task
    npm install grunt-contrib-watch --save-dev
    -----------------------------------------------*/    
    regarde: {
      css: {
        files: 'application/source/sass/**',
        tasks: ['sass:development'],
        events: true
      }
    }
    
  });
  
  /* Load Tasks 
  -----------------------------------------------  
  Using grunt-regarde instead of grunt-contrib-watch
  info here: https://github.com/gruntjs/grunt-contrib-livereload
  ----------------------------------------------- */
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-regarde');
  
  
  /* Register Tasks
  ----------------------------------------------- */
  grunt.registerTask('default', ['sass:development']);
  grunt.registerTask('production', ['sass:production', 'copy:production']);
  grunt.registerTask('wordpress_dev', ['sass:development', 'copy:wordpress']);
  
};