# Grunt Project Kickstarter

### Requirements

Have [Node.js](http://nodejs.org/download/) installed, and [NPM](https://npmjs.org/doc/install.html) would be handy also.

Uninstall Grunt globally, just incase.
```
npm uninstall -g grunt
```

Install Grunt CLI globally.
```
npm install -g grunt-cli
```

cd to your project folder, install [Grunt](https://github.com/gruntjs) there, as well as your other node modules.
```
npm install grunt@0.4.0a --save-dev 
```

[Contrib SASS](https://github.com/gruntjs/grunt-contrib-sass)
```
npm install grunt-contrib-sass --save-dev
```

[FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)

[Image Min](https://github.com/gruntjs/grunt-contrib-imagemin)
```
npm install grunt-contrib-imagemin
```

[Mocha Test](https://github.com/pghalliday/grunt-mocha-test)
```
npm install grunt-mocha-test
```

[Grunt Jekyll](https://github.com/dannygarcia/grunt-jekyll)
```
npm install grunt-jekyll
```

[jsLint](https://github.com/stephenmathieson/grunt-jslint)
```
npm install grunt-jslint
```

[Copy Files](https://github.com/gruntjs/grunt-contrib-copy)
```
npm install grunt-contrib-copy --save-dev
```

[Contrib Watch](https://github.com/gruntjs/grunt-contrib-watch)
```
npm install grunt-contrib-watch --save-dev
```

[Contrib Coffee](https://github.com/gruntjs/grunt-contrib-coffee)
```
npm install grunt-contrib-coffee
```

## Static and Dynamic Site Development
```
- application             <- all your important files
-- development            <- for developing locally
--- (index.html and friends)
-- production   
--- (your compressed, 'ready to push live' files)
-- source
--- coffee                <- Coffescripts
--- images                <- uncompressed images
--- jekyll                <- Jekyll template (if utilising Jekyll)
--- sass                  <- SASS / SCSS directory
- Gruntfile.js            <- where the magic happens
- node_modules            <- all the good stuff
- package.json            <- Grunt's package file
- readme.md               <- this file
```

## WordPress Theme Development
For local WordPress development, all theme files (the ones that you will be making direct changes to) reside in the `development` folder, forexample: 
```
- application
-- development
--- theme-name (within a appropriatly named folder for easy zip and WordPress interaction purposes)
--- function.php
--- index.php
--- style.php etc...
```

and then, the WordPress install (running with either MAMP, or any LAMP application, locally of course) will sit in a folder within `application`, such as:
```
- application
-- wordpress
--- wp-admin
--- wp-content et...
```

or WordPress can be placed outside of your project folder, if you wish to keep your source porject and localhost files seperate.

Then, simple ensure the correct paths are set for the 'copy' Grunt task :)
