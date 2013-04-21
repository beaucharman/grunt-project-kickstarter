/**
 * Project Name
 * ------------------------------------------------------------------------
 * Gruntfile.js
 * @version   1.0 | 19th Feb, 2013
 * @author    Beau Charman | @beaucharman | http://beaucharman.me
 * @link      https://github.com/beaucharman/Grunt-Project-Kickstarter/
 * @license   GNU http://www.gnu.org/licenses/lgpl.txt
 *
 * npm install -g grunt-cli
 * npm install grunt --save-dev
 * ------------------------------------------------------------------------ */

module.exports = function(grunt)
{

  /* ------------------------------------------------------------------------
     Project configuration
     ------------------------------------------------------------------------ */
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON("package.json"),

    meta:
    {
      name: "Project Name"
    },

    /**
     * Sass
     * ------------------------------------------------------------------------
     * npm install grunt-contrib-sass --save-dev
     * ------------------------------------------------------------------------ */
    sass:
    {
      development:
      {
        files:
        {
          "<%= pkg.path.development %><%= pkg.path.lib.styles %>main.css" :
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
     * Coffee
     * ------------------------------------------------------------------------
     * npm install grunt-contrib-coffee --save-dev
     * ------------------------------------------------------------------------ */
    coffee:
    {
      development:
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
     * ------------------------------------------------------------------------
     * npm install grunt-contrib-concat --save-dev
     * ------------------------------------------------------------------------ */
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
     * ------------------------------------------------------------------------
     * Concats and minfies js files
     * npm install grunt-contrib-uglify --save-dev
     * ------------------------------------------------------------------------ */
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
     * Image Min
     * ------------------------------------------------------------------------
     * npm install grunt-contrib-imagemin --save-dev
     * ------------------------------------------------------------------------ */
    imagemin:
    {
      build:
      {
        options:
        {
          optimizationLevel: 3
        },
        files:
        {
          "<%= pkg.path.src.images %>imagename.png" :
            "<%= pkg.path.development %><%= pkg.path.lib.images %>imagename.png"
        }
      }
    },

    /**
     * Jekyll Task
     * ------------------------------------------------------------------------
     * npm install grunt-jekyll --save-dev
     * ------------------------------------------------------------------------ */
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
      compile:{
        src :        "<%= pkg.path.src.jekyll %>",
        dest:        "<%= pkg.path.development %>",
        pygments:    true,
        permalink:   "/articles/:year/:month/:title/"
      }
    },

    /**
     * Copy Files
     * ------------------------------------------------------------------------
     * To be used with WordPress theme development and/or
     * moving development files to deployment
     * npm install grunt-contrib-copy --save-dev
     * ------------------------------------------------------------------------ */
    copy:
    {
      build:
      {
        files:
        [
          {
            expand: true,
            cwd: "<%= pkg.path.development %>",
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
            cwd:    "<%= pkg.path.development %>",
            src:    ["**"],
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
            cwd: "<%= pkg.path.development %>",
            src: ["**", "!**.DS_Store"],
            dest: "<%= pkg.path.deploy %>"
          }
        ]
      },
      testDeploy:
      {
        files:
        [
          {
            expand: true,
            cwd: "<%= pkg.path.deploy %>",
            src: ["**"],
            dest: "relative/path/to/destination/"
          }
        ]
      }
    },

    /**
     * FTP Deploy
     * ------------------------------------------------------------------------
     * Store ftp connection details in a .ftppass file
     * ------------------------------------------------------------------------ */
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
     * ------------------------------------------------------------------------
     * npm install grunt-text-replace --save-dev
     * ------------------------------------------------------------------------ */
    replace:
    {
      deploy:
      {
        src: ["<%= pkg.path.development %>filename.html"],
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
     * Contrib Watch Task
     * ------------------------------------------------------------------------
     * npm install grunt-contrib-watch --save-dev
     * ------------------------------------------------------------------------ */
    watch:
    {
      sass:
      {
        files:  ["<%= pkg.path.src.sass %>**"],
        tasks:  ["sass:development"],
        options:
        {
          nospawn: true
        }
      },
      // used with event listener
      event:
      {
        files:  ["<%= pkg.path.development %>**"],
        tasks:  ["copy:changed"],
        options:
        {
          nospawn: true
        }
      }
    },

    /**
     * Regarde Watch Task
     * ------------------------------------------------------------------------
     * Watch task alternative.
     * npm install grunt-regarde --save-dev
     * ------------------------------------------------------------------------ */
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
   * -----------------------------------------------
   * To be used with Contrib Watch Task, this event function
   * will capture the actual file changed and run run the task
   * on it, rather then the entire watched folder.
   * ----------------------------------------------- */
  grunt.event.on("watch", function(action, filepath)
  {
    var pkg = grunt.file.readJSON("package.json");
    var cwd = pkg.path.development;
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

  /* Load Tasks */
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ftp-deploy");
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-regarde");

  /* Register Tasks */
  grunt.registerTask("default", ["sass:development"]);
  grunt.registerTask("build", ["sass:development", "uglify:development"]);
  grunt.registerTask("copyBuild", ["copy:build", "sass:development"]);
  grunt.registerTask("deploy", ["copy:deploy", "sass:deploy", "ftp-deploy:deploy"]);

};
