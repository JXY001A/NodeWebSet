/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-21 15:56:13
 * @desc:    (首页相关控制路由)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
//  首页
var iMovie = require('../moudle/movie.js');
exports.index = function(req, res) {
	iMovie.fetch(function(error, movies) {
		res.render('index', {
			title: '首页',
			movies: movies
		});
	});
}