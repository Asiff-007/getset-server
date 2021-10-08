'use strict';

var game = require('../models/game'),
    userPrice = require('../models/userPrice'),
    config = require('../resources/config');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    var game_map = new Map();

    game_map.set(1, '/games/views/misteryBox.html');
    game_map.set(2, '/games/views/luckySlingShot.html');

    if (req.validate(null, null, rules)) {
      userPrice.getList({ticket_id: req.query.ticket_id})
        .then(function (userprice) {
          if (userprice.length > 0){
            var user = userprice[0];
            if (user.played) {
              resp.render(process.cwd() +
              game_map.get(req.query.campaign_id),
              {
                price: user.prizeName,
                price_id: user.prizeId,
                ticket_id: req.query.ticket_id,
                price_expiry: user.prizeExpiry,
                isplayed: true,
                campaign_id: req.query.campaign_id,
                url: config.server.url
              });
            }else {
              game.getPrice({campaign_id:req.query.campaign_id})
                .then(function (price) {
                  resp.render(process.cwd() +
                  game_map.get(req.query.campaign_id),
                    {
                      price: price.name,
                      price_id: price.id,
                      ticket_id: req.query.ticket_id,
                      price_expiry: price.expiry,
                      isplayed: false,
                      campaign_id: req.query.campaign_id,
                      url: config.server.url
                    });
                });
            }
          }else {
            resp.sendStatus(404);
          }
        });
    }
  }
};
