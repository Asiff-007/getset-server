'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    tableName = 'campaign';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    model.status = 'active';
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
  get:function (id) {
    return db.read(id,tableName)
    .then(function () {
      return {
        status:'Data readed'
      };
    })
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

