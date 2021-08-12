'use strict';

var campaign = require('../models/campaign');

module.exports = {
  create:function (req, resp) {
    /*var rules = {
        username: {type: 'string', required: true},
        password: {type: 'string', required: true}
      };*/

    //if (req.validate(rules)) {
    campaign.create(req.body)
      .then(resp.success, resp.error);
    //}
  }
};
