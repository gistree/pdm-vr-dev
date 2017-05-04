'use strict';
var sql = require('../sql').user;
module.exports = (rep, pgp) => {
  return {
    find: values => rep.one(sql.find, values) 
  };
};