'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    config = require('../resources/config'),
    util = require('../modules/util'),
    tableName = 'campaign';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    var from = util.getDate(model.from),
        today = util.getDate();
    if (from.getTime() < today.getTime()) {
      model.status = config.campaign_status.active;
    } else {
      model.status = config.campaign_status.pending;
    }
    return db.save(model,tableName)
      .then(function (data) {
        return {
          status: 'Data inserted',
          campaign_id: data
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  },
  getList:function (query) {
    return db.getList(query, tableName, 'shop_id')
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
  },
  updatePriceCount: function (price) {
    var tableNamePrice = 'price',
      updateData = {
        total_prices: price.count
      };

    if (!price.campaign_id) {
      return db.getRecord({id: price.id}, tableNamePrice, tableNamePrice)
        .then(function (data) {
          if (data.count !== price.count) {
            updateData = {
              total_prices: price.count - data.count
            };
            return db.increment('campaign', updateData, data.campaign_id);
          }
          return true;
        });
    } else {
      return db.increment('campaign', updateData, price.campaign_id);
    }
  }
}))();

