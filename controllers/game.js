'use strict';

var game = require('../models/game');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      game.getPrice(req.query)
        .then(function (price) {
          resp.render(process.cwd() +
            '/games/wrapper/misteryBox.html', {price: price.name});
        });
    }
  }
};
