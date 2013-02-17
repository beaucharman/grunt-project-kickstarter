# Grunt Project Kickstarter

## Requirements

Make sure to have **[Node.js](http://nodejs.org/download/)** installed, and **[NPM](https://npmjs.org/doc/install.html)** would be handy also.

Uninstall **[Grunt](https://github.com/gruntjs)** globally, just incase `npm uninstall -g grunt`

Install **Grunt CLI globally** `npm install -g grunt-cli`

cd to your project folder, install **Grunt** there with `npm install grunt@0.4.0a --save-dev`

as well as your other node modules:

- **[Contrib SASS](https://github.com/gruntjs/grunt-contrib-sass)** `npm install grunt-contrib-sass --save-dev`

- **[Contrib Coffee](https://github.com/gruntjs/grunt-contrib-coffee)** `npm install grunt-contrib-coffee`

- **[FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)** `github copy git://github.com/zonak/grunt-ftp-deploy.git`

Example:

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
The authKey is referenceing an entry in a JSON object saved in a `.ftppass` file that you can create and save in the `Gruntfile.js` directory :)
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

- **[Image Min](https://github.com/gruntjs/grunt-contrib-imagemin)** `npm install grunt-contrib-imagemin`

- **[Grunt Jekyll](https://github.com/dannygarcia/grunt-jekyll)** `npm install grunt-jekyll`

- **[Copy Files](https://github.com/gruntjs/grunt-contrib-copy)** `npm install grunt-contrib-copy --save-dev` 

- **[Regarde](https://github.com/yeoman/grunt-regarde)** `npm install grunt-regarde --save-dev`

- **[Contrib Watch](https://github.com/gruntjs/grunt-contrib-watch)** `npm install grunt-contrib-watch --save-dev`

Use this if there is issues with Regarde.

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
### Need to intergrate these:

- **[jsLint](https://github.com/stephenmathieson/grunt-jslint)** `npm install grunt-jslint`

- **[Mocha Test](https://github.com/pghalliday/grunt-mocha-test)** `npm install grunt-mocha-test`

### Would love to get these working:

- **[Contrib LiveReaload](https://github.com/gruntjs/grunt-contrib-livereload)** `npm install grunt-contrib-livereload`

- **[Contrib Connect](https://github.com/gruntjs/grunt-contrib-connect)** `npm install grunt-contrib-connect --save-dev`

## Static and Dynamic Site Development

Folder structure for a typical project, powered by Grunt.
```
| application             <- all your important files
 | development            <- for developing locally
   | (index.html and friends)
 | production   
   | (your compressed, 'ready to push live' files)
 | source
  | coffee                <- Coffescripts
  | images                <- uncompressed images
  | jekyll                <- Jekyll template (if utilising Jekyll)
  | sass                  <- SASS / SCSS directory
| Gruntfile.js            <- where the magic happens
| node_modules            <- all the good stuff
| package.json            <- Grunt's package file
| readme.md               <- this file
```

## WordPress Theme Development
For local WordPress development, all theme files (the ones that you will be making direct changes to) reside in the `development` folder, forexample: 
```
| application
 | development
  |theme-name (within a appropriatly named folder for easy zip and WordPress interaction purposes)
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

Alternativly WordPress can be placed outside of your project folder, if you wish to keep your source project files and localhost files seperate.

Then, simply ensure the correct paths are set for the 'copy' Grunt task :)
