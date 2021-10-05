'use strict';
var Class = require('js-class'),
  userPrice = require('../dao/userPrice'),
  util = require('../modules/util'),
  config = require('../resources/config'),
  tableName = 'user_price',
  db = require('../dao/db');

module.exports = new (Class({ //jshint ignore:line
  create: function (model,campaignId) {
    model.claim_status = config.price_status.not_claimed;
    model.price_won_on = util.getDate();
    
    return db.save(model,tableName)
      .then(function () {
        return db.increment('price', {given: 1}, model.price_id)
          .then(function () {
            return db.increment('campaign', {total_players: 1}, campaignId)
              .then(function () {
                return {
                  status: 'Data inserted'
                };
              })
          });
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  },
  verifyPrice: function (req) {
    return userPrice.getValidUserPrices(req, 'user_price', 'ticket_id')
      .then(function (data) {
        if (data.expiry <= util.getDate()) {
          return {
            status: 'failed',
            error: 'Price is expired'
          };
        } else if (data.claim_status === config.price_status.claimed) {
          return {
            status: 'failed',
            error: 'Price already claimed'
          };
        }
        return data;
      });
  },
  getList:function (query) {
    return userPrice.getList(query)
    .catch({status: 'Failed', error: 'Data reading failed'});
  },
  update:function (id,update,campaignId) {
    return userPrice.update(id,update)
      .then (function () {
        return db.increment('campaign', {claimed_prices: 1}, campaignId)
          .then(function () {
            return {
              status: 'Data updated'
            };
          })
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data updation failed'
        };
      });
  }
}))();

