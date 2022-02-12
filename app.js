const createError = require('http-errors');
const express = require('express');
const path = require('path');
const puppeterr = require('puppeteer')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exhbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const indexRouter = require('./routes/index');


const flash = require('connect-flash')
const app = express();

// config file
require('dotenv').config({ path: './.env' })

// view engine setup
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
})

const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO_URI
})

app.engine('hbs', hbs.engine)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store
}))

require('./helper/db')()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
