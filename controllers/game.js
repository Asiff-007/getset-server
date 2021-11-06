'use strict';

var game = require('../models/game'),
    userPrice = require('../models/userPrice'),
    util = require('../modules/util'),
    customId = require('custom-id'),
    config = require('../resources/config'),
    campaignDb = require('../models/campaign'),
    sys_config = require('../resources/sys_config');

module.exports = {
  index: function (req, resp) {
    var ticketId = customId({uniqueId: util.getDate().toISOString()});
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      campaignDb.getRecord({id:req.query.campaign_id})
        .then( function (response) {
          if(response.status !== 'Failed') {
            if (!response.coupen) {
              game.getPrice({campaign_id:req.query.campaign_id, status:config.price_status.active})
                .then(function (price) {
                  resp.render(process.cwd() +
                  sys_config.game_data.get(response.game_id).url,
                    {
                      price: price.name,
                      price_id: price.id,
                      ticket_id: ticketId,
                      coupon: config.coupen_status.no,
                      price_expiry: price.expiry,
                      isplayed: false,
                      campaign_id: req.query.campaign_id,
                      url: sys_config.server.url,
                      play_validity_days: sys_config.game_data
                                          .get(response.game_id)
                                          .play_validity_in_days
                    });
                });
            }else {
              userPrice.getList({ticket_id: req.query.ticket_id})
                .then(function (userprice) {
                  if (userprice.length > 0){
                    var user = userprice[0];
                    if (user.played) {
                      resp.render(process.cwd() +
                      sys_config.game_data.get(response.game_id).url,
                        {
                          price: user.prizeName,
                          price_id: user.prizeId,
                          ticket_id: req.query.ticket_id,
                          coupon: config.coupen_status.yes,
                          price_expiry: user.prizeExpiry,
                          isplayed: true,
                          campaign_id: req.query.campaign_id,
                          url: sys_config.server.url
                        });
                    }else {
                      game.getPrice({campaign_id:req.query.campaign_id, status:config.price_status.active})
                        .then(function (price) {
                          resp.render(process.cwd() +
                          sys_config.game_data.get(response.game_id).url,
                            {
                              price: price.name,
                              price_id: price.id,
                              ticket_id: req.query.ticket_id,
                              coupon: config.coupen_status.yes,
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
          } else {
            resp.sendStatus(404);
          }
        });
    }
  }
};
