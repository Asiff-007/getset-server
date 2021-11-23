'use strict';
var Class = require('js-class'),
  price = require('./price'),
  config = require('../resources/config'),
  sys_config = require('../resources/sys_config'),
  _ = require('lodash');

module.exports = new (Class({ //jshint ignore:line
  getPrice: function (req) {
    var expiryFactor = 1,
      priceIndexArray = [],
      priceGivenRatio,
      emptyPriceCount;

    return price.getList(req, true)
      .then(function (priceList) {
        priceList = _.orderBy(priceList, ['expiry'], 'desc');
        if( sys_config.campaign_data.get(req.campaign_id)) {
          priceGivenRatio = sys_config.campaign_data.get(req.campaign_id).price_given_ratio;
        }
        priceGivenRatio = priceGivenRatio ? priceGivenRatio : config.price_status.default_price_given_ratio;

        _.each(priceList, function (price, key) {
          var probability = expiryFactor * (price.count - price.given);
          _.times(probability, function () {
            priceIndexArray.push(key);
          });
        });

        emptyPriceCount = priceIndexArray.length * priceGivenRatio;
        _.times(emptyPriceCount, function () {
          priceIndexArray.push(config.price_status.no_price);
        })
        
        var key = priceIndexArray[_.random(0, priceIndexArray.length)];
        if (key === config.price_status.no_price ||priceIndexArray.length === 0) {
          return '';
        }else {
          return priceList[key];
        }
      });
  }
}))();

