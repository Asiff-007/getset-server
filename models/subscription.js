'use strict';

var Class = require('js-class'),
  subscription = require('../dao/subscription');

module.exports = new (Class({ //jshint ignore:line
  getSubscription: function(criteria, today) {
    return subscription.getList(criteria, today)
    .then(function(subscriptionList) {
      if (subscriptionList.length === 0) {
        return {
          subscription: 'Failed'
        };
      }else {
        return {
          subscription: 'Success'
        };
      }
    });
  }
}))();

