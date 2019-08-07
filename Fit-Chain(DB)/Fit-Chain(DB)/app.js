var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //암호화된 세션을 복호화


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('!@#$%fitchain'));
app.use(session({
  resave: true, // 세션의 수정사항이 발생하지 않아도 세션을 다시 저장할 것인가
  saveUninitialized: false, // 세션의 저장내용이 없더라도 세션을 부여할 것인가
  secret: '!@#$%fitchain',
  // 세션ID를 암호화하기 위한 암호키
  // cookie-parser의 argument와 동일해야 함
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));


app.use('/', require('./routes/login'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/del_member', require('./routes/del_member'));
app.use('/main', require('./routes/main'));
app.use('/find_infomation_form', require('./routes/find_infomation_form')); ///김성우 추가
app.use('/myinfo',require('./routes/myinfo'));
app.use('/upload', require('./routes/upload'));
// app.use('/bartest', require('./routes/bartest'));
app.use('/myinfo_update',require('./routes/myinfo_update'));
app.use('/myinfo_gallery',require('./routes/myinfo_gallery'));


app.use('/users', require('./routes/users'));

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
