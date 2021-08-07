'use strict';

var config = require('../resources/config'),
  logger = require('./debug')('RESPONSE'),
  code = config.status,
  messages = config.messages;

module.exports = function (req, res, next) {

  res.success = function (data) {
    try {
      res.status(code.OK)
        .json(data);
    } catch (err) {
      logger.error(err);
    }
  };

  res.error = function (err) {
    logger.error(err, req.body, req.query);

    try {
      res.status(code.ERROR)
        .json(messages.err_resp);
    } catch (err) {
      logger.error(err);
    }
  };

  next();
};
