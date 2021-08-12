'use strict';

var memcache = require('./cache'),
  Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },

  getAdminByUserName:  function (userName) {
    var tableName = 'admin',
      knexInstance = this.knexInstance;

    return memcache.getValue(userName, tableName)
      .catch(function () {
        return knexInstance(tableName)
          .where({
            user_name: userName
          })
          .first()
          .then(function (data) {
            if (data.length > 0) {
              data = data[0];
              memcache.addValue(userName, data, tableName);
            }
            return data;
          });
      });
  },

  save: function (req,tableName) {

    return this.knexInstance(tableName)
      .insert(req)
      .then(function () {
        return true;
      });
  }
}))();
