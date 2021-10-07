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
            status: 'success',
            shop_id: data.shop_id,
            admin_id: data.id
          };
        } else {
          return {
            status: 'failed',
            error: 'Password doesn\'t match'
          };
        }
      })
      .catch(function () {
        return {
          status: 'failed',
          error: 'No user found'
        };
      });
  }
}))();

