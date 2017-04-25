/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-24 14:41:38
 * @desc:    (电影分类模型)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var mongoose = require('mongoose');
var categoryScheam = require('../schemas/category.js');
var Category = mongoose.model('Category',categoryScheam);
module.exports = Category;
