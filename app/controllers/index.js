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
var Category = require('../moudle/category.js');
var iMovie = require('../moudle/movie.js');
exports.index = function(req, res) {
	Category
		.find({})
	    .populate({
	      path: 'movie',
	      select: 'title  poster',
	      options: { limit: 6 }
	    })
	    .exec(function(err,categories){
	    	if (err) {
	    		console.log(err);
	    	}
	    	console.log(categories);
	    	res.render('index', {
				title: '首页',
				categories: categories
			});
	    });

	
}