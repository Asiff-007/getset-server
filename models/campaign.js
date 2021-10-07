'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    config = require('../resources/config'),
    //util = require('../modules/util'),
    _ = require('lodash'),
    tableName = 'campaign';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    /*var from = util.getDate(model.from),//     <-- for future status updation
        today = util.getDate();
    if (from.getTime() < today.getTime()) {
    model.status = config.campaign_status.active;
    } else {
      model.status = config.campaign_status.pending;
    }*/
    model.status = config.campaign_status.active;
    return db.save(model,tableName)
      .then(function (data) {
        return {
          status: 'Data inserted',
          campaign_id: data,
          campaign_status: model.status
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
          if (price.status !== data.status) {
            var isInactive = price.status === config.price_status.inactive;
            price.count = isInactive ? 0 : data.count;
            data.count = isInactive ? data.count : 0;
          }

          if (_.isNumber(price.count) && data.count !== price.count) {
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

