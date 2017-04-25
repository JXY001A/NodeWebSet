/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-24 14:33:09
 * @desc:    (分类模块数据模型)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var objectId = schema.Types.ObjectId;
var categorySchema = new schema({
	movie: [{
		type: objectId,
		ref: 'Movie'
	}],
	name: String,
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

categorySchema.pre('save', function(next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	next();
});

categorySchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb);
	}
}
module.exports = categorySchema;