'use strict';

var user = require('../models/user');

module.exports = {
  create:function (req, resp) {
    var rules = {
        name: {type: 'string', required: true},
        mobile_no: {type: 'string', required: true}
      };

    if (req.validate(rules)) {
      user.create(req.body)
        .then(resp.success, resp.error);
    }
  }
};
