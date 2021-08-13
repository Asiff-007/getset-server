'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    tableName = 'campaign';

module.exports = new (Class({ //jshint ignore:line
  create: function (req) {
    return db.save(req,tableName)
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

