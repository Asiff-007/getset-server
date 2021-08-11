'use strict';

var admin = require('../models/admin');

module.exports = {
  create: function (req, resp) {
    
    var rules = {
        username: {type: 'string', required: true},
        password: {type: 'string', required: true}
      };

    //if (req.validate(rules)) {
      admin.login(req.body)
        .then(resp.success, resp.error);
    //}
  }
};
