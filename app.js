var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produtsRouter = require('./routes/product.route');

var app = express();



 mongoose.connect("mongodb://localhost:27017/revision_4sim2")
   .then(() => { console.log("databse connected"); })
   .catch((exc) => { console.log(exc); })


//mongoose.connect("mongodb://database_service/revision_4sim2")
//.then(() => { console.log("databse connected"); })
//.catch((exc) => { console.log(exc); })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', produtsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
