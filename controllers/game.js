'use strict';

var game = require('../models/game');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    var game_map = new Map();

    game_map.set(1, '/games/views/misteryBox.html');
    game_map.set(2, '/games/views/luckySlingShot.html');

    console.log(req.query);
    if (req.validate(null, null, rules)) {
      game.getPrice(req.query)
        .then(function (price) {
          resp.render(process.cwd() +
            game_map.get(req.query.campaign_id), {price: price.name, campaign_id: req.query.campaign_id});
        });
    }
  }
};
