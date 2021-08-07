'use strict';

var config = require('../resources/config');

module.exports = function (req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': config.access_control_dev.origin,
    'Access-Control-Allow-Headers': config.access_control_dev.headers
  });
  next();
};

