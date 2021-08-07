'use strict';
var _ = require('lodash'),
  path = require('path'),
  Class = require('js-class'),
  fs = require('fs');

module.exports = new (Class({ //jshint ignore:line

  getAppPath: function (game_path, base_cls) {
    var obj = {},
      file_path = path.join(process.cwd(), '/' + game_path);

    try {
      obj = require(file_path);
      if (base_cls) {
        obj.__base = base_cls;
      }
    } catch (e) {
      if (fs.existsSync(file_path + '.js')) {
        throw e;
      }

      obj = {};
    }
    return obj;
  },

  getDate: function (date) {

    if (typeof date === 'string') {
      return new Date(date);
    } else if (date === null || typeof date === 'object') {
      return date;
    } else {
      return new Date();
    }
  }
}))();

// module.exports = new (Class(Base, util))(); //jshint ignore:line
