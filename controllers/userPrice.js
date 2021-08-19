'use strict';

var userPrice = require('../models/userPrice');

module.exports = {
  index:function(req, resp) {
    var rules = {
      ticket_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      userPrice.verifyPrice(req.query)
        .then(resp.success, resp.error);
    }
  }
};
