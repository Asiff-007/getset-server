'use strict';
var Class = require('js-class'),
  userPrice = require('../dao/userPrice'),
  util = require('../modules/util'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line
  verifyPrice: function (req) {
    return userPrice.getValidUserPrices(req, 'user_price', 'ticket_id')
      .then(function (data) {
        if (data.expiry <= util.getDate()) {
          return {
            status: 'failed',
            error: 'price is expired'
          };
        } else if (data.status === config.price_status.claimed) {
          return {
            status: 'failed',
            error: 'price already claimed'
          };
        }
        return data;
      });
  }
}))();

