'use strict';
var Class = require('js-class'),
  db = require('../dao/db'),
  Cryptr = require('cryptr'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line
  login: function (req) {
    var cryptor = new Cryptr(config.cryptor.key);
    return db.getRecord({user_name: req.username}, 'admin', 'userName')
      .then(function (data) {
        if (data && cryptor.decrypt(data.password) === req.password) {
          return {
            status: 'success'
          };
        } else {
          return {
            status: 'failed',
            error: 'password doesn\'t match'
          };
        }
      })
      .catch(function () {
        return {
          status: 'failed',
          error: 'no user found'
        };
      });
  }
}))();

