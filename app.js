/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-15 14:09:24
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var express = require('express');
var mongoose = require('mongoose');
var objectId = require('mongodb').ObjectID;

var path = require('path');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
var bodyParser = require('body-parser');
// 加载静态文件处理模块
var serveStatic = require('serve-static');
var url = 'mongodb://localhost:27017/movie';
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


var iMovie = require('./moudle/movie.js');
// var jade = require('jade');
// 设置默认端口为3000，也可在启东时使用 PORT=4000 node app.js 来动态指定
var port = process.env.PORT || 3000;
var app = express();
// 对表单提交的数据进行格式化处理
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({
	extended: true
}));

// 注意 app.set('views','./views') 中 views必须写对
app.set('views', './views/pages');
app.set('view engine', 'jade');
// 设置静态文件访问入口文件
app.use(serveStatic('bower_components'));
// 用于格式化日期
app.locals.moment = require('moment');
app.listen(port, function() {
	console.log('程序运行在' + port + '端口');
});


// 具体电影的详情页

var m = {
		doctor: '美国人',
		title: '速度与激情8',
		language: 'English',
		country: 'American',
		summary: '速度与激情第八部',
		flash: 'http://player.youku.com/player.php/sid/XMjcxMDkwMTQyMA==/v.swf',
		poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492508930306&di=c255229618b8f3d631019f050c54ef42&imgtype=0&src=http%3A%2F%2Fmoviepic.manmankan.com%2Fyybpic%2Fjuzhao%2F201508%2F2904_67309_s.jpg',
		year: 2017
	}
	//  首页
app.get('/', function(req, res) {
	iMovie.fetch(function(error, movies){
		res.render('index', {
			title: '首页',
			movies:movies
		});
	});
});

app.get('/movie/:id', function(req, res) {
	// 注意req.params 才是正确的写法
	var id = req.params.id;
	iMovie.findId(id, function(error, movie) {
		if (error) {
			console.log(error);
		}
		console.log(movie);
		res.render('detail', {
			title: '详情',
			movie: movie
		});
	});

});
// 列表页
app.get('/admin/list', function(req, res) {
	iMovie.fetch(function(error, movies) {
		if (error) {
			console.log(error);
		}
		res.render('list', {
			title: 'movie admin List',
			movies: movies
		});
	});

});
// 后台录入页
app.get('/admin/movie', function(req, res) {

	res.render('admin', {
		title: '后台录入',
		movie: m
	});
});
// 表单提交页
// post提交必须使用post方法来接受才可以
app.post('/admin/new', function(req, res) {
	var movie = req.body.movie;
	if (movie) {
		var _movie = new iMovie({
			doctor: movie.doctor,
			title: movie.title,
			language: movie.language,
			country: movie.country,
			summary: movie.summary,
			flash: movie.flash,
			poster: movie.poster,
			year: movie.year
		});
		_movie.save(function(error, movie) {
			if (error) {
				console.log(error);
			}
			res.redirect('/admin/' + movie._id);
		});
	}
});