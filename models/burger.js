var orm = require('../config/orm.js');

// Create burger object with all functions created in orm.js
var burger = {
  selectAll: function (callback) {
    orm.selectAll('burgers', function (ormResponse) {
      callback(ormResponse);
    });
  },
  createBurger: function (columns, values, callback) {
    orm.insertOne('burgers', columns, values, function (ormResponse) {
      callback(ormResponse);
    });
  },
  devourBurger: function (columnValue, condition, callback) {
    orm.updateOne('burgers', columnValue, condition, function (ormResponse) {
      callback(ormResponse);
    });
  },
};

module.exports = burger;