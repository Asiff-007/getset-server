var memcache = require('./cache'),
  bluebird = require('bluebird'),
  Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },

  getAdminByUserName: function (userName) {
    var tableName = 'admin',
      knexInstance = this.knexInstance;

    return memcache.getValue(userName, tableName)
      .catch(function () {
        return knexInstance(tableName)
          .where({
            user_name: userName
          })
          .first()
          .then(function (data) {
            if (data.length > 0) {
              data = data[0];
              memcache.addValue(userName, data, tableName);
            }
            return data;
          });
      });
  }
}))();