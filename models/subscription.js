'use strict';

var Class = require('js-class'),
  subscription = require('../dao/subscription');

module.exports = new (Class({ //jshint ignore:line
  isSubscribed: function(criteria) {
    var today = new Date();
    return subscription.getList(criteria, today)
    .then(function(subscriptionList) {
      if (subscriptionList.length === 0) {
        return false;
      }else {
        return subscriptionList;
      }
    });
  }
}))();

