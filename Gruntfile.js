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

    /* Sass
    -----------------------------------------------
    npm install grunt-contrib-sass --save-dev
    ----------------------------------------------- */
    sass:
    {
      development:
      {
        files:
        {
          "application/development/library/styles/main.css" : "application/source/sass/main.scss"
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
          "application/deploy/library/styles/main.css" : "application/source/sass/main.scss"
        },
        options:
        {
          style: "compressed"
        }
      }
    },

    /* Coffee
    -----------------------------------------------
    npm install grunt-contrib-coffee --save-dev
    ----------------------------------------------- */
    coffee:
    {
      development:
      {
        compile:
        {
          files:
          {
            "application/development/library/scripts/main.js" : "application/source/coffee/main.coffee"
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
        src:
        [
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
          "application/deploy/main.js" :
          [
            "application/development/library/scripts/plugin.js",
            "application/development/library/scripts/main.js"
          ]
        }
      }
    },

    /* Image Min
    -----------------------------------------------
    npm install grunt-contrib-imagemin --save-dev
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
          "application/source/images/imagename.png" : "application/development/library/images/imagename.png"
        }
      }
    },

    /* Jekyll Task
    -----------------------------------------------
    npm install grunt-jekyll --save-dev
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
        src :        "application/jekyll/",
        dest:        "application/development/",
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      }
    },

    /* Copy Files
    -----------------------------------------------
    To be used with WordPress theme development and/or
    moving development files to deployment
    npm install grunt-contrib-copy --save-dev
    -----------------------------------------------*/
    copy:
    {
      build:
      {
        files:
        [
          {
            expand: true,
            cwd: "application/development/",
            src: ["**"],
            dest: "relative/path/to/destination/"
          }
        ]
      },
      wordpress:
      {
        files:
        [
          {
            expand: true,
            cwd:    "application/development/theme/",
            src:    ["**"],
            dest:   "relative/path/to/wordpress/install/and/theme/"
          }
        ]
      },
      deploy:
      {
        files:
        [
          {
            expand: true,
            cwd: "application/development/",
            src: ["**", "!**.DS_Store"],
            dest: "application/deploy/"
          }
        ]
      },
      test_deploy:
      {
        files:
        [
          {
            expand: true,
            cwd: "application/deploy/",
            src: ["**"],
            dest: "relative/path/to/destination/"
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
      deploy:
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

    /* Contrib Watch Task
    -----------------------------------------------
    npm install grunt-contrib-watch --save-dev
    -----------------------------------------------*/
    watch:
    {
      sass:
      {
        files:  ["application/source/sass/**"],
        tasks:  ["sass:development"],
        options:
        {
          nospawn: true
        }
      },
      /* Used with dynamic watch task below */
      event:
      {
        files:  ["application/development/**"],
        tasks:  ["copy:changed"],
        options:
        {
          nospawn: true
        }
      }
    },

    /* Regarde Watch Task
    -----------------------------------------------
    Watch task alternative.
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

  /* Dynamic Watch task
  -----------------------------------------------
  To be used with Contrib Watch Task, this event function
  will capture the actual file changed and run run the task
  on it, rather then the entire watched folder.
  ----------------------------------------------- */
  grunt.event.on("watch", function(action, filepath)
  {
    var cwd = "application/development/";
    filepath = filepath.replace(cwd, "");
    grunt.config.set("copy",
    {
      changed:
      {
        expand: true,
        cwd:    cwd,
        src:    filepath,
        dest:   "relative/path/to/destination/"
      }
    });
    /* May need to use this instead of grunt.watch.event.tasks:copy:changed */
    // return grunt.task.run("copy:changed");
  });

  /* Load Tasks
  ----------------------------------------------- */
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ftp-deploy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-regarde");

  /* Register Tasks
  ----------------------------------------------- */
  grunt.registerTask("default", ["sass:development"]);
  grunt.registerTask("build", ["sass:development", "uglify:development"]);
  grunt.registerTask("copy_build", ["copy:build", "sass:development"]);
  grunt.registerTask("deploy", ["copy:deploy", "sass:deploy", "ftp-deploy:deploy"]);

};
