/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-24 14:51:53
 * @desc:    (电影分类标签处理)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var Category = require('../moudle/category');
exports.new = function (req,res){
	res.render('categoryInput');
}
// 保存上传的标签
exports.save = function(req, res) {
	var _category = req.body.category;
	var category = new Category(_category);
	category.save(function(err,category){
		if (err) {
			console.log(err);
		}
		res.redirect('/admin/category/list');
	});
}
// 展示标签列表
exports.list = function(req,res) {
	Category.fetch(function(err,categories){
		res.render('categoryList',{
			categories:categories
		});
	});
}
