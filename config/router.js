/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-21 14:57:29
 * @desc:    (路由模块)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
module.exports = function(app) {
	// 引入首页模块
	var Index = require('../app/controllers/index');
	// 引入用户模块
	var User = require('../app/controllers/user');
	// 引入电影模块
	var Movie = require('../app/controllers/movie');
	// 引入评论模块
	var comment = require('../app/controllers/comment');

	//  首页
	app.get('/', Index.index);

	/*电影相关路由控制*/
	// 具体电影的详情页
	app.get('/movie/:id', Movie.detial);
	// 列表页
	app.get('/admin/list', User.signInRequire, User.adminRequire, Movie.list);
	// 后台录入页
	app.get('/admin/movie', Movie.movie);
	// 表单提交页(电影数据上传)
	// post提交必须使用post方法来接受才可以
	app.post('/admin/new', User.signInRequire, User.adminRequire, Movie.new);
	// 电影数据修改
	app.get('/admin/update/:id', User.signInRequire, User.adminRequire, Movie.update);
	// 电影数据删除
	app.delete('/admin/delete/:id', User.signInRequire, User.adminRequire, Movie.delete);

	/*用户相关的路由控制*/
	// 用户注册页
	app.get('/user/signUp', User.signUp);
	// 用户注册handle
	app.post('/user/signUp', User.signUpHndle);
	// 用户登录页
	app.get('/user/signIn', User.signIn);
	// 用户登陆信息处理路由
	app.post('/user/signIn', User.signInHandle);
	// 用户注销路由
	app.get('/user/logout', User.logout);
	// 用户列表页路由
	app.get('/user/list', User.signInRequire, User.adminRequire, User.list);

	/*用户评论区路由*/
	app.post('/user/comment',User.signInRequire,comment.save);
}