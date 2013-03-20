# Grunt Project Kickstarter

Welcome to the **Grunt Project Kickstarter**, a file and folder structure to aid in the development and deployment process of a HTML, CMS or framework based applications - with some added [Grunt](https://github.com/gruntjs).

## Requirements

Boot up Terminal.

Make sure to have **[Node.js](http://nodejs.org/download/)** installed, and **[NPM](https://npmjs.org/doc/install.html)** would be handy also.

Uninstall **[Grunt](https://github.com/gruntjs)** globally, just incase with `npm uninstall -g grunt`.

Install **Grunt CLI globally** `npm install -g grunt-cli`.

`cd` to your project folder, install **Grunt** there with `npm install grunt --save-dev`.

## Optional Tasks

To use some of the task included in the `Grintfile.js`, make sure you install the following relavent node modules:

**[Contrib Sass](https://github.com/gruntjs/grunt-contrib-sass)** `npm install grunt-contrib-sass --save-dev`

**[Contrib Coffee](https://github.com/gruntjs/grunt-contrib-coffee)** `npm install grunt-contrib-coffee --save-dev`

**[Image Min](https://github.com/gruntjs/grunt-contrib-imagemin)** `npm install grunt-contrib-imagemin --save-dev`

**[Concat](https://github.com/gruntjs/grunt-contrib-concat)** `pm install grunt-contrib-concat --save-dev`

**[Uglify](https://github.com/gruntjs/grunt-contrib-uglify)** `npm install grunt-contrib-uglify --save-dev`

**[Jekyll](https://github.com/dannygarcia/grunt-jekyll)** `npm install grunt-jekyll --save-dev`

**[Copy](https://github.com/gruntjs/grunt-contrib-copy)** `npm install grunt-contrib-copy --save-dev`

**[FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)** `github copy git://github.com/zonak/grunt-ftp-deploy.git`

**[Contrib Watch](https://github.com/gruntjs/grunt-contrib-watch)** `npm install grunt-contrib-watch --save-dev`

**[Regarde](https://github.com/yeoman/grunt-regarde)** `npm install grunt-regarde --save-dev`

### Working with FTP Deploy

```javascript
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
```
The authKey is referencing an entry in a JSON object saved in a `.ftppass` file that you can create and save in the `Gruntfile.js` directory :)

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

### Working with Contrib Watch or Regarde

Use Watch if there are issues with Regarde.

```javascript
/* Watch Task
-----------------------------------------------
npm install grunt-contrib-watch --save-dev
-----------------------------------------------*/
watch:
{
  sass:
  {
    files: ['application/source/sass/**'],
    tasks: ['sass'],
    options:
    {
      interrupt: true
    }
  }
}

...

grunt.loadNpmTasks('grunt-contrib-watch');
```

### Creating a dynamic watch task

```
/* Dynamic Watch task
-----------------------------------------------
To be used with Contrib Watch Task
----------------------------------------------- */
grunt.event.on('watch', function(action, filepath)
{
  var cwd = 'application/development/';
  filepath = filepath.replace(cwd, '');
  grunt.config.set('copy',
  {
    changed:
    {
      expand: true,
      cwd: cwd,
      src: filepath,
      dest: '/destination/folder/'
    }
  });
  return grunt.task.run('copy:changed');
});
```

### Would love to intergrate these soon:

- **[jsLint](https://github.com/stephenmathieson/grunt-jslint)** `npm install grunt-jslint--save-dev`

- **[CSSLint](https://github.com/gruntjs/grunt-contrib-csslint)** `npm install grunt-contrib-csslint --save-dev`

- **[CSSmin](https://github.com/gruntjs/grunt-contrib-cssmin)** `npm install grunt-contrib-cssmin --save-dev`

- **[Mocha Test](https://github.com/pghalliday/grunt-mocha-test)** `npm install grunt-mocha-test --save-dev`

- **[Smush it](https://github.com/heldr/grunt-smushit)** `npm install grunt-smushit --save-dev`

- **[Compass](https://github.com/kahlil/grunt-compass)** `npm install grunt-compass --save-dev`

## Static and Dynamic Site Development

Folder structure for a typical project, powered by Grunt.
```
| application             <- all your important files
 | development            <- for developing locally
   | (index.html and friends)
 | deploy
   | (your compressed, 'ready to push live' files)
 | source
  | coffee                <- Coffescripts
  | images                <- uncompressed images
  | jekyll                <- Jekyll template (if utilising Jekyll)
  | sass                  <- Sass directory
| Gruntfile.js            <- where the magic happens
| node_modules            <- all the good stuff, will appear after a `npm install`
| package.json            <- Grunt's package file
| README.md               <- this file
```

## WordPress Theme Development
For local WordPress development, all theme files (the ones that you will be making direct changes to) reside in the `development` folder, for example:
```
| application
 | development
  |theme-name (within a appropriately named folder for easy zip and WordPress interaction purposes)
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
