'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    tableName = 'enquiry';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
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
  }
}))();

