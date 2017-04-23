/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-23 11:23:17
 * @desc:    (评论模块数据模型)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
// 注意ObjectId的获取
var ObjectId = schema.Types.ObjectId;
var CommentSchema = new mongoose.Schema({
	movie: {
		// ref 的引用不能直接使用数据库中集合的名字，而要使用
		// 声明module时所定义的名字，否则数据无法保存
		type: ObjectId,
		ref: 'Movie'
	},
	from: {
		type: ObjectId,
		ref: 'User'
	},
	content: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

CommentSchema.pre('save', function(next) {
	console.log('************Comming******** ');
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CommentSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}
module.exports = CommentSchema;