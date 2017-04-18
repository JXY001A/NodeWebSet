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
var path = require('path');
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
console.log(iMovie.fetch);
// var jade = require('jade');
// 设置默认端口为3000，也可在启东时使用 PORT=4000 node app.js 来动态指定
var port = process.env.PORT || 3000;
var app = express();
// 注意 app.set('views','./views') 中 views必须写对
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(serveStatic('bower_components'));
app.listen(port, function() {
	console.log('程序运行在' + port + '端口');
});


// 具体电影的详情页

var m = {
		doctor: '唐唐',
		title: '唐唐脱口秀',
		language: '中文',
		country: '中国',
		summary: '最逗比的龙套演员',
		flash: 'http://player.ku6.com/inside/hgwqsQ1SZfzWcD5Nhkigrw../v.swf&adss=0',
		poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492487213917&di=0f28e5fa8adb1f8683a6c19514843e8f&imgtype=0&src=http%3A%2F%2Fr4.ykimg.com%2F050E000053B6789767379F14F10A9BEA',
		year: 2017
	}
//  首页
app.get('/', function(req, res) {

	res.render('index', {
		title: '首页',
		movies:[m,m,m,m,m,m,m,m,m,m]
	});
});

app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title:'电影详情页',
		movie:m
	});
});
// 列表页
app.get('/admin/list', function(req, res) {
	iMovie.fetch(function(error, movies) {
		if (error) {
			console.log(error);
		}
		console.log(movies.length);
		res.render('list', {
			title: 'movie admin List',
			movies: movies
		});
	});

});
// 后台录入页

app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title:'后台录入',
		movie:m
	});
});