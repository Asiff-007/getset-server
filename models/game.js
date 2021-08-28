'use strict';
var Class = require('js-class'),
  price = require('./price'),
  _ = require('lodash');

module.exports = new (Class({ //jshint ignore:line
  getPrice: function (req) {
    var expiryFactor = 1,
      priceIndexArray = [];

    return price.getList(req)
      .then(function (priceList) {
        priceList = _.orderBy(priceList, ['expiry'], 'desc');

        _.each(priceList, function (price, key) {
          var probability = expiryFactor * (price.count - price.given);
          expiryFactor++;
          _.times(probability, function () {
            priceIndexArray.push(key);
          });
        });

        return priceList[priceIndexArray[_.random(0, priceIndexArray.length)]];
      });
  }
}))();

