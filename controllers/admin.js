'use strict';

var admin = require('../models/admin');

module.exports = {
  create: function (req, resp) {
    var rules = {
        
      };

    if (req.validate(rules)) {
      admin.login(req.body)
        .then(resp.success, resp.error);
    }
    // console.log(req); 
    // req.success = true;
  }
};
