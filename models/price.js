'use strict';

var Class = require('js-class'),
  db = require('../dao/db'),
  campaign = require('./campaign'),
  _ = require('lodash'),
  tableName = 'price';

module.exports = new (Class({ //jshint ignore:line
  save: function (model) {
    campaign.updatePriceCount(model);
    model.status = 'Active';
    return db.save(model, tableName)
      .then(function () {
        return {
          status: 'Data inserted'
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  },
  getList: function(criteria) {
    return db.getList(criteria, tableName);
  },
  update: function (id, data) {
    return campaign.updatePriceCount(_.merge({id: id}, data))
      .then(function () {
        return db.update(id, data, tableName)
          .then(function () {
            return {
              status: 'Data updated'
            };
          })
          .catch(function () {
            return {
              status: 'Failed',
              error: 'Data updation failed'
            };
          });
      });
  }
}))();

