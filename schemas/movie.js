var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
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
	findId: function(id, cb) {
		console.log(123);
		return this
			.findById({_id : id})
			.exec(cb);
	}
};
module.exports = MovieSchema;
// db.movies.find({"_id":"ObjectId('58f5bfa07bf4a8207cdce06d')"})

 // ObjectId('58f5bfa07bf4a8207cdce06d')
// utl ="http://player.ku6.com/inside/hgwqsQ1SZfzWcD5Nhkigrw../v.swf&adss=0"
// var data = {
// 	doctor: '唐唐',
// 	title: '唐唐脱口秀',
// 	language: '中文',
// 	country: '中国',
// 	summary: '最逗比的龙套演员',
// 	flash: 'http://player.ku6.com/inside/hgwqsQ1SZfzWcD5Nhkigrw../v.swf&adss=0',
// 	poster: 'http://img3.imgtn.bdimg.com/it/u=1862910970,2759126115&fm=23&gp=0.jpg',
// 	year: 2017
// }
// db.movie.insert({
// 	doctor: '唐唐',
// 	title: '唐唐脱口秀',
// 	language: '中文',
// 	country: '中国',
// 	summary: '最逗比的龙套演员',
// 	flash: 'http://player.ku6.com/inside/hgwqsQ1SZfzWcD5Nhkigrw../v.swf&adss=0',
// 	poster: 'http://img3.imgtn.bdimg.com/it/u=1862910970,2759126115&fm=23&gp=0.jpg',
// 	year: 2017
// })