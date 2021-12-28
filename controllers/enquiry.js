'use strict';

var enquiry = require('../models/enquiry');

module.exports = {
  create:function (req, resp) {
    var rules = {
        name: {type: 'string', required: true},
        contact_number: {type: 'string', required: true}
      };

    if (req.validate(rules)) {
      enquiry.create(req.body)
      .then(resp.success, resp.error);
    }
  }
};
