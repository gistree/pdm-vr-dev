'use strict';
let db = require('../').db;
let cryptoJS = require('crypto-js');
module.exports = {
	find: (req, res, next) => {
		db.user.find({
			username: req.body.username,
			pw: cryptoJS.MD5(req.body.password).toString()
		}).then((user) => {
			res.locals.login = {};
			res.locals.login.username = user.username;
			res.locals.login.pw = user.password;
			return next();
		}).catch(err => {
			let error = new Error("Login Falhou!");
			error.status = 401;
			next(error);
		});
	}
};