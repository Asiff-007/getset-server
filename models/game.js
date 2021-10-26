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
      factor = 1;

    return price.getList(req)
      .then(function (priceList) {
        priceList = _.orderBy(priceList, ['expiry'], 'desc');
        priceGivenRatio = sys_config.game_data.get(req.campaign_id).price_given_ratio;
        priceGivenRatio = priceGivenRatio ? priceGivenRatio : config.price_status.default_price_given_ratio;

        _.each(priceList, function (price, key) {
          var probability = expiryFactor * (price.count - price.given);
          expiryFactor++;
          _.times(probability, function () {
            priceIndexArray.push(key);
            if (factor % priceGivenRatio === 0) {
              priceIndexArray.push(config.price_status.no_price);
            }
            factor++;
          });
        });
        var key = priceIndexArray[_.random(0, priceIndexArray.length)];
        if (key === config.price_status.no_price ||priceIndexArray.length === 0) {
          return '';
        }else {
          return priceList[key];
        }
      });
  }
}))();

