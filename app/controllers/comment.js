/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-23 11:39:07
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */

var Comment = require('../moudle/comment');
exports.save = function(req,res) {
	var _comment =  req.body.comment;
	var movieId = _comment.movie;
	var comment = new Comment(_comment);
	console.log(comment);
	comment.save(function(err,comment) {
		if (err) {
			console.log(err);
		}
		// console.log('******************Comming********************');
		// console.log(comment);
		res.redirect('/movie/' + movieId);
	});
}