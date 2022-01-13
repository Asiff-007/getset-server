'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    tableName = 'user';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    return db.save(model,tableName)
      .then(function (data) {
        return {
          status: 'Data inserted',
          user_id:data
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  }
}))();
