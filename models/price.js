'use strict';

var Class = require('js-class'),
  db = require('../dao/db'),
  tableName = 'price';

module.exports = new (Class({ //jshint ignore:line
  save: function (model) {
    model.status = 'Active';
    return db.save(model, tableName)
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
  getList: function(criteria) {
    return db.getList(criteria, tableName);
  },
  update: function (id, data) {
    return db.update(id, data, tableName)
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

