'use strict';

var userPrice = require('../models/userPrice');

module.exports = {
  index:function(req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      userPrice.getList(req.query)
        .then(resp.success, resp.error);
    }
  },
  get:function(req, resp) {
    var rules = {
      userPrice_id: {type: 'int', required: true}
    };

    if (req.validate(null, rules, null)) {
      userPrice.verifyPrice(req.params.userPrice_id)
        .then(resp.success, resp.error);
    }
  },
  update:function(req,resp) {
    var rules = {
      userPrice_id: {type: 'int', required: true}
    };
    if (req.validate(null, rules, null)) {
      userPrice.update(req.params.userPrice_id,req.body)
        .then(resp.success, resp.error);
    }
  }
};
