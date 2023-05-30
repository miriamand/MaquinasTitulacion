const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');

//Initializations
const app = express();
require('./db/database')
require("./passport/local-auth")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
require("./helpers/helpers")

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/img/uploads'),
  filename:(req,file,cb,filename) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({storage : storage}).single('image'))
app.use(session({
  secret: 'lebnympam',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  app.locals.successMessage = req.flash('successMessage');
  app.locals.failureMessage = req.flash('failureMessage');
  next();
})
app.use('/', indexRouter);
app.use('/home', homeRouter);
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
