'use strict';

var Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },
  getList: function(query,date) {
    return this.knexInstance('subscription')
    .where(query)
    .andWhere('expiry','>',date)
    .then(function (data) {
      return data;
    });
  }
}))();
