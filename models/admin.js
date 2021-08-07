'use strict';
var _ = require('lodash'),
  path = require('path'),
  Class = require('js-class'),
  bluebird = require('bluebird'),
  fs = require('fs');

module.exports = new (Class({ //jshint ignore:line

  login: function (game_path, base_cls) {
    return bluebird.resolve({});
  }
}))();

