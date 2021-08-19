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

  getList: function(query, tableName, memCacheKey) {
    var knexInstance = this.knexInstance,
        memKey = query[memCacheKey],
        memCacheTable =  tableName + '_list';

    return memcache.getValue(memKey, memCacheTable)
      .catch(function () {
        return knexInstance(tableName)
          .where(query)
          .then(function (data) {
            memcache.addValue(memKey, data, memCacheTable);
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
      memKey = criteria[memCacheKey],
      memCacheTable =  tableName + '_record';

    return memcache.getValue(memKey, memCacheTable)
      .catch(function () {
        return knexInstance(tableName)
          .where(criteria)
          .first()
          .then(function (data) {
            if (data.length > 0) {
              data = data[0];
              if (memKey) {
                memcache.addValue(memKey, data, memCacheTable);
              }
            }
            return data;
          });
      });
  }
}))();
