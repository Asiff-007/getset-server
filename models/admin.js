'use strict';
var _ = require('lodash'),
  path = require('path'),
  Class = require('js-class'),
  bluebird = require('bluebird'),
  db = require('../dao/db'),
  Cryptr = require('cryptr'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line
  login: function (req) {
    var cryptor = new Cryptr(config.cryptor.key);
    return db.getAdminByUserName(req.username, req.password)
      .then(function (data) {

        if (data && cryptor.decrypt(data.password) == req.password) {
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
      .catch(function (error) {
        return {
          status: 'failed',
          error: 'no user found'
        };
      });
  }
}))();

