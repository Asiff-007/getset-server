'use strict';

var campaign = require('../models/campaign');

module.exports = {
  create:function (req, resp) {
    /*var rules = {
        campaign_name: {type: 'string', required: true},
        status: {type: 'string', required: true}
        shop_id: {type: 'int', required: true}
        admin_id: {type: 'int', required: true}
      };*/

    //if (req.validate(rules)) {
    campaign.create(req.body)
      .then(resp.success, resp.error);
    //}
  },
  index:function(req,resp) {
    campaign.getList(req.query)
      .then(resp.success, resp.error);

  },
  update:function(req,resp) {
    var id = req.params.campaign_id;
    campaign.update(id,req.body)
      .then(resp.success, resp.error);
  }
};
