/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-15 14:09:24
 * @desc:    (node 服务器 入口代码)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var express = require('express');
var mongoose = require('mongoose');


var path = require('path');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
var bodyParser = require('body-parser');
// 加载静态文件处理模块
var serveStatic = require('serve-static');
// 会话持久化所用到的插件
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
// logger
var morgan = require('morgan');
var url = 'mongodb://localhost:27017/movie';
// 连接数据库
mongoose.connect(url);
// 连接成功
mongoose.connection.on('connected', function() {
	console.log('Mongoose connection open to ' + url);
});

// 连接异常
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose connection disconnected');
});

// var jade = require('jade');
// 设置默认端口为3000，也可在启东时使用 PORT=4000 node app.js 来动态指定
var port = process.env.PORT || 3000;
var app = express();

/*中间件*/
// 对表单提交的数据进行格式化处理
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
// 会话持久化中间件
app.use(cookieParser());
app.use(session({
	secret: 'immoic',
	store: new mongoStore({
		url: url,
		collection: 'sessions'
	})
}));
// 判断环境变量模块是否正常
if ('development' === app.get('env')) {
	// 显示错误栈
	app.set('showStrackError', true);
	// 显示每次的请求状态（请求方法，请求地址，请求状态码，请求内容长度，请求响应的时间）
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
	// 设置代码不压缩
	app.locals.pretty = true;
	// 开启数据库连接代理的debug模式
	mongoose.set('debug', true);
}
// 用户登录验证中间件
app.use(function(req, res, next) {
	var _user = req.session.user;
	// 每次请求的进来的时候都会去h获取session中的user
	// 如果用户登录则有，否则没有，同时每次locals.user也将被
	// 重新赋值，以便随追踪用户的状态
	app.locals.user = _user;
	next();
});
// 设置静态文件访问入口文件
// app.use(serveStatic('public/libs'));
app.use(express.static('public/libs'));


// 注意 app.set('views','./views') 中 views必须写对
app.set('views', './app/views/pages');
app.set('view engine', 'jade');

// 将个刷日期插件写入到本地变量中，以便在模板中使用
app.locals.moment = require('moment');

// 监听指定的端口号
app.listen(port, function() {
	console.log('程序运行在' + port + '端口');
});
// 加载路由模块
require('./config/router')(app);