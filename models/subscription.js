'use strict';

var Class = require('js-class'),
  subscription = require('../dao/subscription');

module.exports = new (Class({ //jshint ignore:line
  getList: function(criteria, today) {
    return subscription.getList(criteria, today);
  }
}))();

