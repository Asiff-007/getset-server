module.exports = function (file) {
  'use strict';

  var debug = require('debug');

  return {
    log: debug(file),
    error: debug(file + ' Error')
  };
};
