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

  save: function (model,tableName) {
    return this.knexInstance(tableName)
      .insert(model)
      .then(function () {
        return true;
      });
  },

  getList: function(query,tableName) {
    var knexInstance = this.knexInstance;
    return memcache.getValue(query.shop_id, tableName)
      .catch(function () {
        return knexInstance(tableName)
          .where(query)
          .then(function (data) {
            memcache.addValue(query.shop_id, data, tableName);
            return data;
          });
      });
  },

  update:function (id,update,tableName) {
    return this.knexInstance(tableName)
    .where({
      id:id
    })
    .update(update)
    .then(function (data) {
      if (data) {
        return true;
      }
    });
  }
}))();
