# Grunt Project Kickstarter

Welcome to the **Grunt Project Kickstarter**, a file and folder structure to aid in the development and deployment process of a HTML, CMS or framework based applications - with some added [Grunt](https://github.com/gruntjs).

## Installation

Follow http://gruntjs.com/getting-started for an in-depth look at setting up Grunt, but basically:

- Boot up Terminal
- Make sure to have **[Node.js](http://nodejs.org/download/)** installed
- Uninstall **[Grunt](https://github.com/gruntjs)** globally, just incase with `npm uninstall -g grunt`
- Install **Grunt CLI globally** `npm install -g grunt-cli`
- `cd` to your project folder
- Get the files $ git clone https://github.com/beaucharman/Grunt-Project-Kickstarter.git (move the files one level up if need)
- Install Grunt to the project root with `npm install grunt --save-dev`

## Optional Tasks

To use some of the task included in the `Grintfile.js`, make sure you install the following relavent node modules (using [npm](https://npmjs.org/doc/install.html)):

**[Contrib Sass](https://github.com/gruntjs/grunt-contrib-sass)** `npm install grunt-contrib-sass --save-dev`

**[cssLint](https://github.com/gruntjs/grunt-contrib-csslint)** `npm install grunt-contrib-csslint --save-dev`

**[Contrib Coffee](https://github.com/gruntjs/grunt-contrib-coffee)** `npm install grunt-contrib-coffee --save-dev`

**[Concat](https://github.com/gruntjs/grunt-contrib-concat)** `pm install grunt-contrib-concat --save-dev`

**[Uglify](https://github.com/gruntjs/grunt-contrib-uglify)** `npm install grunt-contrib-uglify --save-dev`

**[jsHint](https://github.com/gruntjs/grunt-contrib-jshint)** `npm install grunt-contrib-jshint --save-dev`

**[Jekyll](https://github.com/dannygarcia/grunt-jekyll)** `npm install grunt-jekyll --save-dev`

**[Copy](https://github.com/gruntjs/grunt-contrib-copy)** `npm install grunt-contrib-copy --save-dev`

**[FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)** `git clone git://github.com/zonak/grunt-ftp-deploy.git`

**[Text Replace](https://github.com/yoniholmes/grunt-text-replace)** `npm install grunt-text-replace --save-dev`

**[Contrib Watch](https://github.com/gruntjs/grunt-contrib-watch)** `npm install grunt-contrib-watch --save-dev`

**[Regarde](https://github.com/yeoman/grunt-regarde)** `npm install grunt-regarde --save-dev`

**[Volo](https://github.com/volojs/grunt-volo)** `npm install grunt-volo --save-dev`

Plus many, many others via the [Grunt Plugins](http://gruntjs.com/plugins) page.

## Configuration

**Tasks**

For each task that is used, it needs to be locally installed (described in the above section), and needs to be referenced
in the `Gruntfile.js` by using the `grunt.loadNpmTasks();` function. Comment out or remove any unneeded tasks.

**File Paths**

Most tasks require and use file paths to perform said tasks. The Grunt Project Kickstarter stores paths in the package.json file. Make sure these paths reflect that of your project structure, and add / change paths where required.

## A Run Down of the Registered Custom Tasks

The following registered, custom tasks are suggestions for an awesome workflow. Custom tasks are declared using the `grunt.registerTask();` function, which at it's basic usage takes two arguments, one being the new task's alias (how it will be called in the terminal), and the other being an array of tasks that will run (executed in array index order). Read more about [creating tasks](http://gruntjs.com/creating-tasks).

**Default**

Command: `grunt`

Task registration: `grunt.registerTask("default", ["sass:development"]);`

Can be defined as necessary, currenty simply processes the Sass:development task.

**Watch Sass**

Command: `grunt watchSass`

Task registration: `grunt.registerTask("watchSass", ["watch:sass"]);`

This task watches the defined Sass directory for changes, and processes them.

**Build**

Command: `grunt build`

Task registration: `grunt.registerTask("build", ["sass:development", "copy:build"]);`

Run preprocessing and copy files to the development environment. Great to use when working in a 'development files here... testing environment here' way.

**Deploy**

Command: `grunt deploy`

Task registration: `grunt.registerTask("deploy", ["uglify:deploy", "copy:deploy", "sass:deploy"]);`

Run preprocessing, concatenate, minify and copy files for deploment.

**WordPress Deploy**

Task registration: `grunt.registerTask("deploy", ["copy:deploy", "uglify:deploy", "sass:deploy", "replace:deploy"]);`

Run preprocessing, concatenate, minify and copy files. Also change any development mode options in template files to be ready for deployment. Can be used with any framework, particularly where you have options in your files that change once in deployment mode.

**Test Deploy**

Command: `grunt testDeploy`

Task registration: `grunt.registerTask("testDeploy", ["copy:testDeploy"]);`

Copies the deployment files into the development environment for testing. Awesome to use with a framework or CMS workflow. (make sure your minified and concatenated js files still work... sorta thing)

---

### Working with FTP Deploy

The `authKey` is referencing an entry in a JSON object saved in a `.ftppass` file that you can create and save in the `Gruntfile.js` directory :)

Example `.ftppass` file:

```javascript
{
  "keyname": {
    "username": "",
    "password": ""
  },
  "altkeyname": {
    "username": "",
    "password": ""
  }
}
```

### Creating a dynamic watch task

The following creates a listener for the watch task, captures the event and filename
when a change is detected, then runs the dynamically created (in this instance, copy:changed)
on the effected file.

```javascript
 grunt.event.on("watch", function(event, listener) {
    var pkg = grunt.file.readJSON("package.json");
    var cwd = pkg.path.development;
    filepath = listener.replace(cwd, "");
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
```

### Would love to intergrate these soon:

**[CSSmin](https://github.com/gruntjs/grunt-contrib-cssmin)** `npm install grunt-contrib-cssmin --save-dev`

**[Mocha Test](https://github.com/pghalliday/grunt-mocha-test)** `npm install grunt-mocha-test --save-dev`

**[Smush it](https://github.com/heldr/grunt-smushit)** `npm install grunt-smushit --save-dev`

**[Compass](https://github.com/kahlil/grunt-compass)** `npm install grunt-compass --save-dev`

**[SHH](https://github.com/andrewrjones/grunt-ssh)** `git clone git://github.com/andrewrjones/grunt-ssh.git`

### Static and Dynamic Site Development

Folder structure for a typical project, powered by Grunt.
```
| application         <- all your important files
  | development       <- for developing locally
    | (index.html and friends)
  | deploy
    | (your compressed, 'ready to push live' files)
  | source
    | coffee          <- Coffescripts
    | images          <- uncompressed images
    | jekyll          <- Jekyll templates (if utilising Jekyll)
    | sass            <- Sass directory
  | test
    | (output from test ralated tasks)
| Gruntfile.js        <- where the magic happens
| node_modules        <- all the good stuff, will appear after an 'npm install'
| package.json        <- Grunt's package file, store our variables too :)
| README.md           <- this file
```

### WordPress Theme Development
For local WordPress development, all theme files (the ones that you will be making direct changes to) reside in the `development` folder, for example:
```
| application
  | development
    | theme-name (within a appropriately named folder for easy zip and WordPress interaction purposes)
      | function.php
      | index.php
      | style.css etc...
```

and then, the WordPress install (running with either MAMP, or any LAMP application, locally of course) will sit in a folder within `application`, such as:
```
| application
  | wordpress
    | wp-admin
    | wp-content etc...
```

Alternatively WordPress can be placed outside of your project folder, if you wish to keep your source project files and localhost files separate.

Then, simply ensure the correct paths are set for the 'copy' Grunt task :)

### More ideas for WordPress development

Add the following to the Sass task to create a dynamic Sass generated `custom-editor-styles.css` file.

```javaScript
/* WordPress editor styles */
"<%= pkg.path.development %><%= pkg.path.lib.styles %>custom-editor-styles.css":
  "<%= pkg.path.src.sass %>includes/custom-editor-styles.scss"
```