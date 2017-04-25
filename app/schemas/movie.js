var mongoose = require('mongoose');
var scheam = mongoose.Schema;
var objectId = scheam.Types.ObjectId;
var MovieSchema = new scheam({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	category: {
		type: objectId,
		ref: 'Category'
	},
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
// 该方法用于监听每一次数据的插入，对其进行处理
MovieSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	// 应该是继续执行下一条（递归实现）
	next();
});

MovieSchema.statics = {
	// 该方法用于取出当前数据库中的所有数据
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
};
module.exports = MovieSchema;