/**
 * Project Name
 * ========================================================================
 * Gruntfile.js
 * @version   2.0 | 28th April, 2013
 * @author    Beau Charman | @beaucharman | http://beaucharman.me
 * @link      https://github.com/beaucharman/grunt-project-kickstarter
 * @license   MIT license
 *
 * Instructions: http://gruntjs.com/getting-started
 * npm uninstall -g grunt
 * npm install -g grunt-cli
 * npm install grunt --save-dev
 * ======================================================================== */

module.exports = function(grunt) {

  'use strict';

  /* ========================================================================
     Init configuration
     ======================================================================== */
  grunt.initConfig({

    /**
     * Package file
     * ========================================================================
     * All variable, dependency and version information for the project.
     * ======================================================================== */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * Sass
     * ========================================================================
     * npm install grunt-contrib-sass --save-dev
     * ======================================================================== */
    sass:
    {
      development:
      {
        files:
        {
          "<%= pkg.path.development %><%= pkg.path.lib.styles %>main.css":
            "<%= pkg.path.src.sass %>main.scss"
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
          "<%= pkg.path.deploy %><%= pkg.path.lib.styles %>main.css" :
            "<%= pkg.path.src.sass %>main.scss"
        },
        options:
        {
          style: "compressed"
        }
      }
    },

    /**
     * cssLint
     * ========================================================================
     * npm install grunt-contrib-csslint --save-dev
     * ======================================================================== */
    csslint:
    {
      all:
      {
        src:
        [
          "<%= pkg.path.development %><%= pkg.path.lib.styles %>main.css"
        ]
      }
    },

    /**
     * Coffee
     * ========================================================================
     * npm install grunt-contrib-coffee --save-dev
     * ======================================================================== */
    coffee:
    {
      deploy:
      {
        compile:
        {
          files:
          {
            "<%= pkg.path.development %><%= pkg.path.lib.scripts %>main.js" :
              "<%= pkg.path.src.coffee %>main.coffee"
          }
        }
      }
    },

    /**
     * Concat
     * ========================================================================
     * npm install grunt-contrib-concat --save-dev
     * ======================================================================== */
    concat:
    {
      deploy:
      {
        src:
        [
          "<%= pkg.path.development %><%= pkg.path.lib.scripts %>plugin.js",
          "<%= pkg.path.development %><%= pkg.path.lib.scripts %>main.js"
        ],
        dest: "<%= pkg.path.deploy %><%= pkg.path.lib.scripts %>main.js"
      }
    },

    /**
     * Uglify
     * ========================================================================
     * npm install grunt-contrib-uglify --save-dev
     * ======================================================================== */
    uglify:
    {
      deploy:
      {
        options:
        {
          mangle: false
        },
        files:
        {
          "<%= pkg.path.deploy %><%= pkg.path.lib.scripts %>main.js" :
          [
            "<%= pkg.path.development %><%= pkg.path.lib.scripts %>plugin.js",
            "<%= pkg.path.development %><%= pkg.path.lib.scripts %>main.js"
          ]
        }
      }
    },

    /**
     * jsHint
     * ========================================================================
     * npm install grunt-contrib-jshint --save-dev
     * ======================================================================== */
    jshint:
    {
      all:
      [
        "<%= pkg.path.development %><%= pkg.path.lib.scripts %>plugin.js",
        "<%= pkg.path.development %><%= pkg.path.lib.scripts %>main.js"
      ]
    },

    /**
     * Jekyll
     * ========================================================================
     * npm install grunt-jekyll --save-dev
     * ======================================================================== */
    jekyll:
    {
      server:
      {
        src:         "<%= pkg.path.src.jekyll %>",
        dest:        "<%= pkg.path.development %>",
        auto:        false,
        server:      true,
        server_port: 4000,
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      },
      compile:
      {
        src :        "<%= pkg.path.src.jekyll %>",
        dest:        "<%= pkg.path.development %>",
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      }
    },

    /**
     * Clean
     * ========================================================================
     * npm install grunt-contrib-clean --save-dev
     * ======================================================================== */
    clean:
    {
      deploy: ["<%= pkg.path.deploy %>"],
      wordpress: ["<%= pkg.path.wordpress %>"]
    },

    /**
     * Copy
     * ========================================================================
     * npm install grunt-contrib-copy --save-dev
     * For WordPress theme development, use:
     * copy.build.files.dest:"<%= pkg.path.wordpress %>"
     * ======================================================================== */
    copy:
    {
      build:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.development %>",
            src:    ["**", "!**.DS_Store"],
            dest:   "<%= pkg.path.deploy %>"
          }
        ]
      },
      wordpress:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.development %>",
            src:    ["**", "!**.DS_Store"],
            dest:   "<%= pkg.path.wordpress %>"
          }
        ]
      },
      deploy:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.development %>",
            src:    ["**", "!**.DS_Store"],
            dest:   "<%= pkg.path.deploy %>"
          }
        ]
      },
      testDeploy:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.deploy %>",
            src:    ["**"],
            dest:   "relative/path/to/destination/"
          }
        ]
      }
    },

    /**
     * FTP Deploy
     * ========================================================================
     * git clone git://github.com/zonak/grunt-ftp-deploy.git
     * Store ftp connection details in a .ftppass file
     * ======================================================================== */
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
        src:        "<%= pkg.path.deploy %>",
        dest:       "public_html/",
        exclusions: ["**/.DS_Store", "**/Thumbs.db"]
      }
    },

    /**
     * Text Replace
     * ========================================================================
     * npm install grunt-text-replace --save-dev
     * ======================================================================== */
    replace:
    {
      deploy:
      {
        src:  ["<%= pkg.path.development %>filename.html"],
        dest: "<%= pkg.path.deploy %>filename.html",
        replacements:
        [
          {
            from: "original text",
            to:   "replacement text"
          }
        ]
      }
    },

    /**
     * Smushit
     * ========================================================================
     * npm install grunt-smushit
     * ======================================================================== */
    smushit:
    {
      deploy:
      {
        src:
        [
          '<%= pkg.path.development %>/**/*.jpg',
          '<%= pkg.path.development %>/**/*.png'
        ]
      }
    },

    /**
     * Watch
     * ========================================================================
     * npm install grunt-contrib-watch --save-dev
     * ======================================================================== */
    watch:
    {
      sass:
      {
        files: ["<%= pkg.path.src.sass %>**"],
        tasks: ["sass:development"],
        options:
        {
          nospawn: true
        }
      },
      // used with event listener
      event:
      {
        files: ["<%= pkg.path.development %>**"],
        tasks: ["copy:changed"],
        options:
        {
          nospawn: true
        }
      }
    },

    /**
     * Regarde
     * ========================================================================
     * Watch task alternative.
     * npm install grunt-regarde --save-dev
     * ======================================================================== */
    regarde:
    {
      sass:
      {
        files:  "<%= pkg.path.src.sass %>**",
        tasks:  ["sass:development"],
        events: true
      }
    }

  });

  /** Dynamic Watch task
   * ========================================================================
   * To be used with Contrib Watch Task, this event function
   * will capture the actual file changed and run run the task
   * on it, rather then the entire watched folder.
   * ======================================================================== */
  grunt.event.on("watch", function (event, file) {
    var pkg = grunt.file.readJSON("package.json");
    var cwd = pkg.path.development;
    var filepath = file.replace(cwd, "");
    grunt.config.set("copy",
    {
      changed:
      {
        expand: true,
        cwd:    cwd,
        src:    filepath,
        dest:   'path/to/copy/destination/'
      }
    });

    /* May need to use this instead of grunt.watch.event.tasks:copy:changed */
    // return grunt.task.run("copy:changed");
  });

  /**
   * Volo
   * ========================================================================
   * npm install grunt-volo
   * Used to fetch Github repos through the terminal.
   * To fetch a file:  grunt volo:add:[flags]:[archive]:[localName]
   * To search github: grunt volo:search:[name]
   * More information:
   *   https://github.com/volojs/volo/blob/master/commands/add/doc.md
   * ======================================================================== */

  /* ========================================================================
     Load Tasks
     ======================================================================== */
  //grunt.loadNpmTasks("grunt-contrib-sass");
  //grunt.loadNpmTasks('grunt-contrib-csslint');
  //grunt.loadNpmTasks("grunt-contrib-coffee");
  //grunt.loadNpmTasks("grunt-contrib-concat");
  //grunt.loadNpmTasks("grunt-contrib-uglify");
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks("grunt-jekyll");
  //grunt.loadNpmTasks("grunt-contrib-clean");
  //grunt.loadNpmTasks("grunt-contrib-copy");
  //grunt.loadNpmTasks("grunt-ftp-deploy");
  //grunt.loadNpmTasks("grunt-text-replace");
  //grunt.loadNpmTasks('grunt-smushit');
  //grunt.loadNpmTasks("grunt-contrib-watch");
  //grunt.loadNpmTasks("grunt-regarde");
  //grunt.loadNpmTasks('grunt-volo');

  /* ========================================================================
     Register custom tasks
     ======================================================================== */

  /**
   * The default Grunt task
   * ========================================================================
   * Tasks to run simply with the command `grunt`
   */
  grunt.registerTask("default", ["sass:development"]);

  /**
   * Watch Sass
   * ========================================================================
   * Simply watch for Sass changes, and process
   */
  grunt.registerTask("watchSass", ["watch:sass"]);

  /**
   * Build
   * ========================================================================
   * Run preprocessing and copy files
   */
  grunt.registerTask("build", ["sass:development", "copy:build"]);

  /**
   * Deploy
   * ========================================================================
   * Run preprocessing, concatenate, minify and copy files for deploment
   */
  grunt.registerTask("deploy", ["uglify:deploy", "copy:deploy", "sass:deploy"]);

  /**
   * WordPress Deploy
   * ========================================================================
   * Run preprocessing, concatenate, minify and copy files.
   * Also change any development mode options in template files to be
   * ready for deployment.
   */
  grunt.registerTask("deploy", [
    "clean:deploy", "copy:deploy", "uglify:deploy", "sass:deploy", "replace:deploy"
  ]);

  /* Test deployment files */
  grunt.registerTask("testDeploy", ["copy:testDeploy"]);

};
