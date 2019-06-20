var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet')
const NODE_PATH = process.cwd();
var login = require('./routes/login');
var planets = require('./routes/planets');

var app = express();
app.set('views', path.join(NODE_PATH, '/ui/templates'));
app.set('view engine', 'pug');
app.use(favicon(path.join(NODE_PATH, 'public', 'icons/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(NODE_PATH, 'public')));

app.disable('x-powered-by');

app.use('/', login);
app.use('/planets', planets);

app.use('*', (req, res, next) => {
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Deafult Error handler: ", err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: false,
    error: err
  });
});

module.exports = app;

