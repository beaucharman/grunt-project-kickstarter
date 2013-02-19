/*
    
  Grunt Project Kickstater
    
-----------------------------------------------
19th Feb, 2013
@beaucharman, http://beaucharman.me
npm install -g grunt-cli
npm install grunt --save-dev
----------------------------------------------- */

module.exports = function(grunt) 
{

  /* Project configuration
  ----------------------------------------------- */
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
    
    meta: 
    {
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
          'application/development/library/styles/main.css':'application/source/sass/main.scss'
        },
        options: 
        {                     
          style: 'expanded'
        }  
      },
      production: 
      {
        files:
        {
          'application/production/library/styles/main.css':'application/source/sass/main.scss'
        },
        options: 
        {                     
          style: 'compressed'
        }  
      }
    }, 
    
    /* Coffee 
    -----------------------------------------------  
    npm install grunt-contrib-coffee 
    ----------------------------------------------- */
    coffee: 
    {
      development: 
      {
        compile: 
        {
          files: 
          {
            'application/development/library/scripts/main.js':'application/source/coffee/main.coffee'
          }
        }
      }
    },
    
    /* Image Min 
    ----------------------------------------------- 
    npm install grunt-contrib-imagemin
    ----------------------------------------------- */
    imagemin: 
    {                          
      development: 
      {                            
        options: 
        {                       
          optimizationLevel: 3
        },
        files: 
        {                         
          'application/source/images/imagename.png':'application/development/library/images/imagename.png'
        }
      }
    },
    
    /* Jekyll Task 
    -----------------------------------------------
    npm install grunt-jekyll
    -----------------------------------------------*/    
    jekyll: 
    {
      server: 
      {
        src:         'application/source/jekyll/',
        dest:        'application/development/',
        auto:        true,
        server:      true,
        server_port: 4000,
        pygments:    true,
        permalink:   '/articles/:year/:month/:title/'
      }
    },
    
    /* Copy Files
    -----------------------------------------------
    To be used with WordPress theme development and/or
    moving development files to production
    npm install grunt-contrib-copy
    -----------------------------------------------*/
    copy: 
    {
      production: 
      {
        files: 
        {
          'application/production/':'application/development/**'
        }
      },
      wordpress: 
      {
        files: 
        {
          'path/to/wordpress/theme/from/this/file':'application/development/**'
        }
      }
    },
    
    /* FTP Deploy 
    -----------------------------------------------
    Store ftp connection details in a .ftppass file
    ----------------------------------------------- */
    'ftp-deploy': 
    {
      build: 
      {
        auth: 
        {
          host:     'ftp.website.com',
          port:     21,
          authKey:  'keyname'
        },
        src:        'application/production/',
        dest:       'public_html/',
        exclusions: ['**/.DS_Store', '**/Thumbs.db']
      }
    },
    
    /* Regarde Watch Task 
    -----------------------------------------------
    Alternate to the above watch task
    npm install grunt-regarde --save-dev
    -----------------------------------------------*/    
    regarde: 
    {
      css: 
      {
        files:  'application/source/sass/**',
        tasks:  ['sass:development'],
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
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-regarde');
  
  /* Register Tasks
  ----------------------------------------------- */
  grunt.registerTask('default', ['sass:development']);
  grunt.registerTask('production', ['copy:production', 'sass:production']);
  grunt.registerTask('wordpress_dev', ['sass:development', 'copy:wordpress']);
  
};