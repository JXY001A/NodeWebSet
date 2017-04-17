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
var url = 'mongodb://localhost:27017/imovie';
mongoose.connect(url);
var iMovie = require('moudle\movie.js');

// var jade = require('jade');
// 设置默认端口为3000，也可在启东时使用 PORT=4000 node app.js 来动态指定
var port = process.env.PORT || 3000;
var app = express();
// 注意 app.set('views','./views') 中 views必须写对
app.set('views', './views');
app.set('view engine', 'jade');

app.listen(port, function() {
	console.log('程序运行在' + port + '端口');
});
//  首页
app.get('/', function(req, res) {
	res.render('index', {
		title: 'movie index'
	});
});
// 具体电影的详情页
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'movie detail'
	});
});
// 列表页
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'movie admin List'
	});
});
// 后台录入页
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'movie admin '
	});
});