'use strict';

var price = require('../models/price');

module.exports = {
  create: function (req, resp) {
    var rules = {
        campaign_id: {type: 'int', required: true},
        name: {type: 'string', required: true},
        count: {type: 'int', required: true},
        expiry: {type: 'date'}
      };

    if (req.validate(rules)) {
      price.save(req.body)
        .then(resp.success, resp.error);
    }
  },
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      price.getList(req.query, false)
        .then(resp.success, resp.error);
    }
  },
  update: function (req, resp) {
    var rules = {
      price_id: {type: 'int', required: true}
    };

    if (req.validate(null, rules, null)) {
      price.update(req.params.price_id, req.body)
        .then(resp.success, resp.error);
    }
  }
};
