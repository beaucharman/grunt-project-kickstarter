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
    pkg: grunt.file.readJSON("package.json"),

    meta:
    {
      name: "Grunt Project Kickstater"
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
          "application/development/library/styles/main.css":"application/source/sass/main.scss"
        },
        options:
        {
          style: "expanded"
        }
      },
      deploy:
      {
        files:
        {
          "application/deploy/library/styles/main.css":"application/source/sass/main.scss"
        },
        options:
        {
          style: "compressed"
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
            "application/development/library/scripts/main.js":"application/source/coffee/main.coffee"
          }
        }
      }
    },

    /* Concat
    -----------------------------------------------
    npm install grunt-contrib-concat --save-dev
    ----------------------------------------------- */
    concat:
    {
      development:
      {
        src: [
          "application/development/library/scripts/plugin.js",
          "application/development/library/scripts/main.js"
        ],
        dest: "application/deploy/main.js"
      }
    },

    /* Uglify
    -----------------------------------------------
    Concats and minfies js files
    npm install grunt-contrib-uglify --save-dev
    ----------------------------------------------- */
    uglify:
    {
      development:
      {
        options:
        {
          mangle: false
        },
        files:
        {
          "application/deploy/main.js": [
            "application/development/library/scripts/plugin.js",
            "application/development/library/scripts/main.js"
          ]
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
          "application/source/images/imagename.png":"application/development/library/images/imagename.png"
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
        src:         "application/source/jekyll/",
        dest:        "application/development/",
        auto:        false,
        server:      true,
        server_port: 4000,
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      },
      compile:{
        src :        "application/jekyll",
        dest:        "application/development",
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      }
    },

    /* Copy Files
    -----------------------------------------------
    To be used with WordPress theme development and/or
    moving development files to deployment
    npm install grunt-contrib-copy
    -----------------------------------------------*/
    copy:
    {
      deploy:
      {
        files:
        [
          {
            expand: true,
            cwd: 'application/development/',
            src: ['**'],
            dest: 'application/deploy/'
          }
        ]
      },
      wordpress:
      {
        files:
        [
          {
            expand: true,
            cwd: 'application/development/theme/',
            src: ['**'],
            dest: 'relative/path/to/wordpress/install/and/theme'
          }
        ]
      }
    },

    /* FTP Deploy
    -----------------------------------------------
    Store ftp connection details in a .ftppass file
    ----------------------------------------------- */
    "ftp-deploy":
    {
      build:
      {
        auth:
        {
          host:     "ftp.website.com",
          port:     21,
          authKey:  "keyname"
        },
        src:        "application/deploy/",
        dest:       "public_html/",
        exclusions: ["**/.DS_Store", "**/Thumbs.db"]
      }
    },

    /* Regarde Watch Task
    -----------------------------------------------
    npm install grunt-regarde --save-dev
    -----------------------------------------------*/
    regarde:
    {
      css:
      {
        files:  "application/source/sass/**",
        tasks:  ["sass:development"],
        events: true
      }
    }

  });

  /* Load Tasks
  -----------------------------------------------
  Using grunt-regarde instead of grunt-contrib-watch
  info here: https://github.com/gruntjs/grunt-contrib-livereload
  ----------------------------------------------- */
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ftp-deploy");
  grunt.loadNpmTasks("grunt-regarde");

  /* Register Tasks
  ----------------------------------------------- */
  grunt.registerTask("default", ["sass:development"]);
  grunt.registerTask("deploy", ["copy:deploy", "sass:deploy", "ftp-deploy:build"]);
  grunt.registerTask("wordpress_dev", ["sass:development", "copy:wordpress"]);

};
