'use strict';
var _ = require('lodash'),
  path = require('path'),
  Class = require('js-class'),
  fs = require('fs');

module.exports = new (Class({ //jshint ignore:line
  getDate: function (date) {

    if (typeof date === 'string') {
      return new Date(date);
    } else if (date === null || typeof date === 'object') {
      return date;
    } else {
      return new Date();
    }
  },
  getToday: function () {
    const date = new Date()
    return date.toISOString().split('T')[0];
  }
}))();

// module.exports = new (Class(Base, util))(); //jshint ignore:line
