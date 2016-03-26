var express       = require('express');
var https         = require('https');
var bodyParser    = require('body-parser');
var logger        = require('morgan');
var mongoose      = require('mongoose');
var fs            = require('fs');
var favicon       = require('serve-favicon');
var app           = express();

// connect to mongod default port:27017
mongoose.connect('mongodb://localhost:27017/mean', function(err) {
    if (err)
      throw err;
    console.log('Successfully connected to MongoDB');
});

// logs usefull intel for every requested routes
app.use(logger('dev'));

/*
 * populates the req.body property with the parsed body, or an empty object ({})
 * if there was no body to parse (or an error was returned).
*/
app.use(bodyParser.json({limit: '4mb'}));

// serves favicon
app.use(favicon(__dirname + '/client/assets/favicon.ico'));

// serves all html files
app.use(express.static(__dirname + '/client/views'));

// serves all assets (images, icons)
app.use(express.static(__dirname + '/client/assets'));

// serves processed css and js
app.use(express.static(__dirname + '/client/dist'));

// sets header to allow cross origin requests
app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  if (req.method == 'OPTIONS'){
    res.status(200).end();
  }
  next();
});


/*
 * for every route that starts with /api/v1, checks that user token
 * is present and valid in http request
*/
app.all('/api/v1/', [require('./server/middlewares/checkToken')]);

// post related routes
var post = require('./server/routes/post.js');
app.get('/api/v1/posts', post.getAll);
app.get('/api/v1/post/:id', post.getOne);
app.post('/api/v1/admin/post/', post.create);
app.put('/api/v1/admin/post/:id', post.update);
app.delete('/api/v1/admin/post/:id', post.delete);

// gallery related routes
var gallery = require('./server/routes/gallery.js');
app.get('/api/v1/galleries', gallery.getAll);
app.get('/api/v1/gallery/:id', gallery.getOne);
app.post('/api/v1/admin/gallery/', gallery.create);
app.put('/api/v1/admin/gallery/:id', gallery.update);
app.delete('/api/v1/admin/gallery/:id', gallery.delete);

// user related routes
var user = require('./server/routes/user.js');
app.post('/login', user.login);
app.get('/api/v1/admin/users', user.getAll);
app.get('/api/v1/admin/user/:id', user.getOne);
app.post('/api/v1/admin/user/', user.create);
app.put('/api/v1/admin/user/:id', user.update);
app.delete('/api/v1/admin/user/:id', user.delete);

// if we're not working with our rest api send index.html
// this is necessary because we use html5mode(true) on client side
// otherwise our app will break on page refresh
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});

/*
 *  if none of the routes above are a match, this will be run
 *  and server will respond with a 404
*/
app.use(function(req, res, next){
  var err = {};
  err.status = 404;
  next(err);
});

/*
 * creates https server, self generated certificates will throw a warning
 * ok for development but get a real one for production !
*/
var credentials = {
    key: fs.readFileSync('./server/config/hacksparrow-key.pem'),
    cert: fs.readFileSync('./server/config/hacksparrow-cert.pem')
};

https
  .createServer(credentials, app)
  .listen(5555);

console.log('Express server listening on port ' + 5555);
