var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var post = require('./routes/post');
var admin = require('./routes/admin');
var adminpage = require('./routes/adminpage');
var write = require('./routes/write');
var remove = require('./routes/rmpost');
var comment = require('./routes/rmcomment');

var app = express();
mongoose.connect('mongodb://localhost:27017/blog');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
  console.log('Connect to mongodb server.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use('/previews', express.static('previews'));
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/post', post);
app.use('/admin', admin);
app.use('/admin', adminpage);
app.use('/admin/write', write);
app.use('/admin/delete', remove);
app.use('/admin/comments', comment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
