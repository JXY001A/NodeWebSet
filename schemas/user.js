var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRound = 10;
var userSchema = new mongoose.Schema({
	userName: {
		unique: true,
		type: String
	},
	password: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default:Date.now()
		}
	}
});
// 在用户注册或是登录操作的时候该操作都会提前执行
userSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.Now();
	} else {
		this.meta.updateAt = Date.Now();
	}
	// 生成
	bcrypt.genSalt(saltRound, function(error, salt) {
		if (error) {
			return next(error);
		}
		console.log('salt' + salt);
		bcrypt.hash(this.password, salt, function(error, hash) {
			if (error) {
				return next(error);
			}
			this.password = hash;
			// 如果一切正常则向下执行
			next();
			// 将user对的this硬绑定到加密方法上
		}).bind(this);
	}).bind(this);
});
// 添加静态方法
userSchema.static = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb);
	}
}
module.exports = userSchema;