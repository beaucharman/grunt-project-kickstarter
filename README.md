# Grunt Project Kickstarter

### Requirements

Have [Node.js](http://nodejs.org/download/) installed

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
- application 
-- development
--- index.html and friends
-- production
-- source
--- coffee     <- Coffescripts
--- images     <- uncompressed images
--- jekyll     <- Jekyll template (if utilising Jekyll)
--- sass       <- SASS / SCSS directory
- node_modules <- all the good stuff
- package.json <- Grunt's package file
- readme.md    <- this file
```

## WordPress Theme Development

-application 
--development
---html files
--production
--source
---coffee
---jekyll
---sass
-node_modules
-package.json

