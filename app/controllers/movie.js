/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-21 16:11:50
 * @desc:    (movie相关路由控制)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var iMovie = require('../moudle/movie.js');
var Comment = require('../moudle/comment.js');
var Category = require('../moudle/category.js');
// 用于合并两个属性值基本相同的对象
var _underscore = require('underscore');
// 电影详情页
exports.detial = function(req, res) {
	// 注意req.params 才是正确的写法
	var id = req.params.id;
	iMovie.findById(id, function(error, movie) {
		if (error) {
			console.log(error);
		}
		Comment
			.find({'movie':id})
			// 使用populate方法关联查询from表中与当前电影相关的
			// 用户名，第一个参数为要关联的表，第二个参数为要
			// 显示的关联表中的数据字段名
			.populate('from','name')
			.populate('reply.from','name')
			.populate('reply.to','name')
			.exec(function(err,comments){
				if (err) {
					console.log(err);
				}
				console.log(comments);
				res.render('detail', {
					title: '详情',
					movie: movie,
					comments:comments
				});
			});
	});
};

// 列表页
exports.list = function(req, res) {
	iMovie.fetch(function(error, movies) {
		if (error) {
			console.log(error);
		}
		res.render('list', {
			title: 'movie admin List',
			movies: movies
		});
	});
};
// 后台录入页
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

exports.movie = function(req, res) {
	Category.fetch(function(err,categories){

		res.render('admin', {
			title: '后台录入',
			movie: m,
			categories:categories
		});
	});
};
// 表单提交页(电影数据上传)
// post提交必须使用post方法来接受才可以
exports.new = function(req, res) {
	var movie = req.body.movie;
	var id = movie._id;
	// 删除的原因是存在 movie._id 的话，那么则无法自动生成
	// _id ,同时数据也就无法保存成功，故删除之
	delete movie._id;
	var catId =  movie.category;
	var _movie = null;
	if (id) {
		// 判断为数据修改时的处理
		iMovie.findById(id, function(error, movieObj) {
			// 将删除后的id又给添加进去，因为更新的时候
			// 需要完整的数据类型
			movie._id=id;
			// 将修改后的对象与原有数据对象更新
			_movie = _underscore.extend(movieObj, movie);

			_movie.save(function(error, movie) {
				if (error) {
					console.log(error);
				}
				// 保存成功之后重定向到更新后的详情页
				res.redirect('/movie/' + movie._id);
			});
		});
	} else {
		// 数据录入的情况
		console.log(movie);
		_movie = new iMovie(movie);
		_movie.save(function(error, movie) {
			if (error) {
				console.log(error);
			}
			Category.findById(catId,function(err,category){
				if (err) {
					console.log(err);
				}
				// 将上传的电影id保存到对应分类表中的数组中
				category.movie.push(movie._id);
				category.save(function(err,category){
					res.redirect('/movie/' + movie._id);
				});
			});
		});
	}
};
// 电影数据修改
exports.update = function(req, res) {
	var id = req.params.id;
	iMovie.findById(id, function(error, movie) {
		if (error) {
			console.log(error);
		}
		// 通过id获得数据，然后在admin中进行渲染
		// 之后再提交到数据录入的路由中，然后通过是否
		// 存在id来判断是数据录入还是数据修改
		Category.fetch(function(err,categories){
			if (err) {
				console.log(err);
			}

			res.render('admin', {
				title: '修改',
				movie: movie,
				categories:categories
			});
		});
	});
};
// 删除电影数据
exports.delete = function(req, res) {
	var id = req.params.id;
	if (id) {
		iMovie.remove({
			'_id': id
		}, function(error, movie) {
			if (error) {
				console.log(error);
			} else {
				res.json({
					success: 1
				});
			}

		});
	}
};