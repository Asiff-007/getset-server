'use strict';

var campaign = require('../models/campaign');

module.exports = {
  create:function (req, resp) {
    var rules = {
        campaign_name: {type: 'string', required: true},
        shop_id: {type: 'int', required: true},
        admin_id: {type: 'int', required: true}
      };

    if (req.validate(rules)) {
      campaign.create(req.body)
        .then(resp.success, resp.error);
    }
  },
  index:function(req,resp) {
    var rules = {
      shop_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      campaign.getList(req.query)
        .then(resp.success, resp.error);
    }
  },
  update:function(req,resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };
    if (req.validate(null, rules, null)) {
      campaign.update(req.params.campaign_id,req.body)
        .then(resp.success, resp.error);
    }
  }
};
