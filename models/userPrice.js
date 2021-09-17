'use strict';
var Class = require('js-class'),
  userPrice = require('../dao/userPrice'),
  util = require('../modules/util'),
  config = require('../resources/config'),
  db = require('../dao/db');

module.exports = new (Class({ //jshint ignore:line
  verifyPrice: function (req) {
    return userPrice.getValidUserPrices(req, 'user_price', 'ticket_id')
      .then(function (data) {
        if (data.expiry <= util.getDate()) {
          return {
            status: 'failed',
            error: 'price is expired'
          };
        } else if (data.claim_status === config.price_status.claimed) {
          return {
            status: 'failed',
            error: 'price already claimed'
          };
        }
        return db.increment('campaign', {claimed_prices: 1}, data.campaign_id)
          .then (function () {
            return db.update(data.id, {
              claim_status: config.price_status.claimed,
              claimed_on: new Date()
            }, 'user_price');
          })
          .then(function () {
            return data;
          });
      });
  },
  getList:function (query) {
    return userPrice.getList(query)
    .catch({status: 'Failed', error: 'Data reading failed'});
  }
}))();

