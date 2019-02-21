require('babel-core/register');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由配置文件
var setRouters = require('./routes/index')
// 配置拦截器
var Interceptor = require('./public/javascripts/intercetor/interceptor');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 请求路由拦截中间件
// interceptor(app);
new Interceptor(app)._init();
// 配置路由
setRouters(app);

module.exports = app;
