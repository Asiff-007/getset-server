'use strict';

var price = require('../models/price');

module.exports = {
  create: function (req, resp) {
    /*var rules = {
        campaign_id: {type: 'int', required: true},
        name: {type: 'string', required: true}
        count: {type: 'int', required: true}
        expiry: {type: 'datetime'}
      };*/

    //if (req.validate(rules)) {
    price.save(req.body)
      .then(resp.success, resp.error);
    //}
  },
  index: function (req, resp) {
    // var rules = {
    //   shop_id: {type: 'int', required: false}
    // };

    // if (req.validate) {
    price.getList(req.query)
      .then(resp.success, resp.error);
    // }
  },
  update: function (req, resp) {
    // var rules = {
    //   campaign_id: {type: 'int', required: false}
    // };

    // if (req.validate) {
    price.update(req.params.price_id, req.body)
      .then(resp.success, resp.error);
    // }
  }
};
