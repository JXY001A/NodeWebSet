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
exports.save = function(req, res) {
	var _comment = req.body.comment;
	var movieId = _comment.movie;

	// 被回复的评论的id
	var commnetId = _comment.cid;
	// 如果有cid存在说明是评论回复
	if (_comment.cid) {
		var reply = {
			// 当前评论者的id
			from: _comment.from,
			// 被评论者的id
			to: _comment.tid,
			// 评论的内容
			content: _comment.content
		};
		// 找到被回复的那条评论
		Comment
			.findById({
				_id: commnetId
			}, function(err, comment) {
				if (err) {
					console.log(err);
				}
				// 将回复的评论添加到文档数组中
				comment.reply.push(reply);
				// 重新将评论保存到数据库中
				comment.save(function(err, comment) {
					if (err) {
						console.log(err);
					}
					res.redirect('/movie/' + movieId);
				});

			});
	} else {
		var comment = new Comment(_comment);
		comment.save(function(err, comment) {
			if (err) {
				console.log(err);
			}
			res.redirect('/movie/' + movieId);
		});
	}
}