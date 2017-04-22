var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRound = 10;
var userSchema = new mongoose.Schema({
	name: String,
	password: String,
	role: {
		type: Number,
		default: 0
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
userSchema.methods = {
	comparePassword: function(_password, cb) {
		var hasePassword = this.password;
		bcrypt.compare(_password, hasePassword, function(err, res) {
			if (err) {
				cb(err);
			}
			cb(null, res);
		});
	}
};
// 在用户注册或是登录操作的时候该操作都会提前执行
userSchema.pre('save', function(next) {
	// console.log('this.isNew===='+this.isNew);
	var user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	// 生成
	bcrypt.genSalt(saltRound, function(error, salt) {
		if (error) {
			return next(error);
		}
		console.log('salt===' + salt);
		// console.log(user);
		bcrypt.hash(user.password, salt, function(error, hash) {
			if (error) {
				return next(error);
			}
			console.log('加密后的密码' + hash);
			user.password = hash;
			// 如果一切正常则向下执行
			next();
		});
	});
});
// 添加静态方法
userSchema.statics = {
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
module.exports = userSchema;