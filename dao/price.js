'use strict';

var Class = require('js-class'),
  knex = require('knex'),
  util = require('../modules/util'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line
  constructor: function () {
    this.knexInstance = knex(config.db);
  },
  getList:function (query, ignoreExpired) {
    var query = this.knexInstance('price')
        .where(query);

        console.log(ignoreExpired);
    if (ignoreExpired) {
        query.andWhere('expiry', '>=', util.getToday());
    }
    console.log(query.toSQL().toNative());
    return query.then(function (data) {
        return data;
    })
    
  }
}))();
