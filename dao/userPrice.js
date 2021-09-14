'use strict';

var Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },
  getValidUserPrices: function(ticketId) {
    return this.knexInstance('user_price')
      .innerJoin('price', 'price.id', '=', 'user_price.price_id')
      .where('user_price.ticket_id', ticketId)
      .then(function (data) {
        if (data.length > 0) {
          data = data[0];
        }
        return data;
      });
  },
  getList:function (query) {
    return this.knexInstance('user_price')
    .innerJoin('price', 'price.id', '=', 'user_price.price_id')
    .innerJoin('user', 'user.id', '=' , 'user_price.user_id')
    .where(query)
    .select('user.name as userName','price.name as prizeName')
    .then(function (data) {
      return data;
    });
  }
}))();
