'use strict';

var memcache = require('./cache'),
  Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },
  save: function (model,tableName) {
    return this.knexInstance(tableName)
      .insert(model)
      .then(function () {
        return true;
      });
  },

  getList: function(query,tableName) {
    var knexInstance = this.knexInstance,
        shop_id = query.shop_id;

    return memcache.getValue(shop_id, tableName)
      .catch(function () {
        return knexInstance(tableName)
          .where(query)
          .then(function (data) {
            memcache.addValue(shop_id, data, tableName);
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
        memcache.delValue(id,tableName);
        return true;
      }
    });
  },
  getRecord: function(criteria, tableName, memCacheKey) {
    var knexInstance = this.knexInstance,
      memKey = criteria[memCacheKey];

    return memcache.getValue(memKey, tableName)
      .catch(function () {
        return knexInstance(tableName)
          .where(criteria)
          .first()
          .then(function (data) {
            if (data.length > 0) {
              data = data[0];
              if (memKey) {
                memcache.addValue(memKey, data, tableName);
              }
            }
            return data;
          });
      });
  }
}))();
