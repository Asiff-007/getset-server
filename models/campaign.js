'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    tableName = 'campaign';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    model.status = 'Active';
    return db.save(model,tableName)
      .then(function () {
        return {
          status: 'Data inserted'
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  },
  getList:function (query) {
    return db.getList(query, tableName, 'shop_id')
    .catch(function () {
      return {
        status: 'Failed',
        error: 'Data reading failed'
      };
    });
  },
  update:function (id,update) {
    return db.update(id,update,tableName)
      .then(function () {
        return {
          status: 'Data updated'
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data updation failed'
        };
      });
  }
}))();

