## Stack

- grunt
- mongo, mongoose
- express, body-parser, morgan, serve-favicon
- angular, angular-route, angular-animate, angular-ui-bootstrap
- node, bcrypt, jwt
- less, bootstrap, jquery, cssgram, font-awesome

## Setting it up

Make sure you have mongo and node installed then run
```
git clone repo-path
cd repo-path
npm install
```

In order for grunt to launch mongod you will need to create a data/db folder at the root of the project
```
  mkdir data data/db
```

You're all set.

## Run

To start your project just run
```
grunt
```

Grunt is setup to execute quit a few tasks. It will:
- launch mongod
- check that all js files respect best code practices with jshint
- process less files into css
- concat and minify css into one file
- concat and minify js into one file
- execute server.js
- reload application on file change
