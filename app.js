var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var cors = require('cors');
var jarvis = require('./src/routes/jarvis');
var app = express();

// view engine setup

app.engine('.html', exphbs({
  defaultLayout: 'main',
  extname: '.html'
}));
app.set('view engine', '.html');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/jarvis', jarvis);

app.use("/" ,express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      status : err.status,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    status : err.status,
    message: err.message,
    error: {}
  });
});


module.exports = app;
