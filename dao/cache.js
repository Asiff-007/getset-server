'use strict';

var Memcached = require('memcache-promise'),
  Class = require('js-class'),
  Bluebird = require('bluebird'),
  config = require('../resources/config'),
  memcached = new Memcached(config.memcache.servers, config.memcache.options),
  prefix = config.memcache.prefix,
  lifetime = config.memcache.lifetime,
  _ = require('lodash'),
  getKey = function (id, type) {
    return prefix + type + ':' + id;
  };

module.exports = new (Class({ //jshint ignore:line

  getValue: function (id, type) {
    // Converting memcache's q promise to bluebird
    return new Bluebird(function (resolve, reject) {
      memcached.get(getKey(id, type))
        .then(function (res) {
          if (res) {
            resolve(res);
          } else {
            reject('not_found');
          }
        })
        .catch(reject);
    });
  },
  addValue: function (id, data, type) {
    // Converting memcache's q promise to bluebird
    return new Bluebird(function (resolve, reject) {
      memcached.set(getKey(id, type), data, lifetime)
        .then(resolve)
        .catch(reject);
    });
  },

  push: function (key, value, type) {
    if (!_.isArray(value)) {
      value = [value];
    }

    return this.getValue(key, type)
      .bind(this)
      .then(function (data) {
        return this.addValue(key, _.union(data, value), type);
      })
      .catch(this.addValue.bind(this, key, value, type));
  },

  delValue: function (id, type) {
    // Converting memcache's q promise to bluebird
    return new Bluebird(function (resolve, reject) {
      memcached.del(getKey(id, type))
        .then(resolve)
        .catch(reject);
    });
  }
}))();
