'use strict';
var sql = require('../sql').locations;
module.exports = (rep, pgp) => {
  return {
    findFreguesias: values => rep.manyOrNone(sql.findFreguesias, values),
    findLocalidades: values => rep.manyOrNone(sql.findLocalidades, values)
  };
};