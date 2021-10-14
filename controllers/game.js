'use strict';

var game = require('../models/game'),
    userPrice = require('../models/userPrice'),
    config = require('../resources/config'),
    sys_config = require('../resources/sys_config');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      console.log(config.coupen_less[0]);
      if (config.coupen_less.includes(req.query.campaign_id)) {
        console.log('coupenless worked');
        game.getPrice({campaign_id:req.query.campaign_id})
          .then(function (price) {
            resp.render(process.cwd() +
            sys_config.game_data.get(req.query.campaign_id).url,
              {
                price: price.name,
                price_id: price.id,
                ticket_id: '0000',
                price_expiry: price.expiry,
                isplayed: false,
                campaign_id: req.query.campaign_id,
                url: sys_config.server.url
              });
          });
      }else {
      userPrice.getList({ticket_id: req.query.ticket_id})
        .then(function (userprice) {
          if (userprice.length > 0){
            var user = userprice[0];
            if (user.played) {
              resp.render(process.cwd() +
              sys_config.game_data.get(req.query.campaign_id).url,
              {
                price: user.prizeName,
                price_id: user.prizeId,
                ticket_id: req.query.ticket_id,
                price_expiry: user.prizeExpiry,
                isplayed: true,
                campaign_id: req.query.campaign_id,
                url: sys_config.server.url
              });
            }else {
              game.getPrice({campaign_id:req.query.campaign_id})
                .then(function (price) {
                  resp.render(process.cwd() +
                  sys_config.game_data.get(req.query.campaign_id).url,
                    {
                      price: price.name,
                      price_id: price.id,
                      ticket_id: req.query.ticket_id,
                      price_expiry: price.expiry,
                      isplayed: false,
                      campaign_id: req.query.campaign_id,
                      url: sys_config.server.url
                    });
                });
            }
          }else {
            resp.sendStatus(404);
          }
        });
    }
  }
  }
};
