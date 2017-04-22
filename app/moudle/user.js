/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-20 10:49:54
 * @desc:    (用户模块)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user.js');
var User = mongoose.model('User',userSchema);
module.exports = User;
