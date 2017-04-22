/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-21 16:01:14
 * @desc:    (用户相关路由控制)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var iUser = require('../moudle/user.js');
// 注册页请求处理方法
exports.signUp = function(req, res) {
	res.render('signUp', {
		title: '注册'
	});
};
// 用户注册handle
exports.signUpHndle = function(req, res) {
	var Cuser = req.body.user;
	iUser.findOne({
		name: Cuser.name
	}, function(err, user) {
		// 如果用户已经注册成功，则直接跳转的到登录界面
		if (user) {
			res.redirect('/user/signUp');
		} else {
			// 如果用户是第一次注册，那就保存用户数据
			var _user = new iUser(Cuser);
			_user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				// 用户注册成功后跳转到用户列表页
				res.redirect('/user/list');
			});

		}
	});
};
// 登录页请求
exports.signIn = function(req, res) {
	res.render('signIn', {
		title: '登录'
	});
};
// 用户登录处理
exports.signInHandle = function(req, res) {
	var user_client = req.body.user;
	iUser.findOne({
		name: user_client.name
	}, function(err, user) {
		// 如果用户名不存在则跳转至注册页
		if (!user) {
			return res.redirect('/user/signUp');
		}
		// 存在
		user.comparePassword(user_client.password, function(err, result) {
			// 如果密码核对正确，重定向到首页
			if (result) {
				// 将用户信息保存到session中
				req.session.user = user;
				// 登录完成重定向到首页
				return res.redirect('/');
			} else {
				// 如果密码不对则重新加载当期页
				return res.redirect('/user/signIn');
			}
		});
	});
};
// 用户注销路由
exports.logout = function(req, res) {
	// 清除会话和本地变量中的游湖数据
	delete req.session.user;
	// 用户注销时不再需要直接删除locals下的user对象
	// 因为每次进入页面的时候都会先在session中获取user对象
	res.redirect('/');
};
// 用户列表页路由
exports.list = function(req, res) {
	iUser.fetch(function(err, users) {
		res.render('userList', {
			title: '用户列表页',
			users: users
		});
	});
};

// 用户权限管理中间件（midware）
exports.signInRequire = function(req, res, next) {
	var _user = req.session.user;
	if (!_user) {
		// 如果用户没有登录，则跳转至登录页
		return res.redirect('/user/signIn');
	}
	// 继续向下执行
	next();

};
// 管理员权限控制
exports.adminRequire = function(req, res, next) {
	var _user = req.session.user;
	// 如果用户权限不大于10说明是普通用户，则跳转至首页
	// 如果是管理员继续向下执行
	if (_user.role<10) {
		return res.redirect('/');
	}
	next();
};
