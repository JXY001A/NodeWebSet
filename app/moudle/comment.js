/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-23 11:35:40
 * @desc:    (评论模块)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;