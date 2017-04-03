'use strict';
let db = require('../').db;
module.exports = {
	findFreguesias: (req, res, next) => {
		db.locations.findFreguesias().then((freguesias) => {
			res.locals.data = freguesias;
			return next();
		}).catch(err => next(err));		
	},
	findLocalidades: (req, res, next) => {
		db.locations.findLocalidades().then((localidades) => {
			res.locals.data = localidades;
			return next();
		}).catch(err => next(err));
	}
};