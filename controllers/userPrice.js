'use strict';

var userPrice = require('../models/userPrice');

module.exports = {
  create:function (req, resp) {
    var rules = {
      price_id: {type: 'int', required: true}
    };
    if (req.validate(rules)) {
      var query = req.query
      userPrice.create(req.body,query.campaign_id,query.ticket_id,query.coupon)
        .then(resp.success, resp.error);
    }
  },
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
      userPrice_id: {required: true}
    };

    if (req.validate(null, rules, null)) {
      userPrice.verifyPrice(req.params.userPrice_id)
        .then(resp.success, resp.error);
    }
  },
  update:function(req,resp) {
    var rules = {
      userPrice_id: {required: true}
    };
    if (req.validate(null, rules, null)) {
      userPrice.update(req.params.userPrice_id,req.body,req.query.campaign_id)
        .then(resp.success, resp.error);
    }
  }
};
