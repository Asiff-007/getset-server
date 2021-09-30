'use strict';

var game = require('../models/game'),
    userPrice = require('../models/userPrice');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      userPrice.getList({ticket_id: req.query.ticket_id})
        .then(function (userprice) {
          if (userprice.length > 0) {
            resp.render(process.cwd() +
            '/games/views/misteryBox.html',
            {
              price: userprice.prizeName,
              price_id: userprice.prizeId,
              ticket_id: req.query.ticket_id,
              isplayed: true
            });
          }else {
            game.getPrice({campaign_id:req.query.campaign_id})
              .then(function (price) {
                resp.render(process.cwd() +
                  '/games/views/misteryBox.html',
                  {
                    price: price.name,
                    price_id: price.id,
                    ticket_id: req.query.ticket_id,
                    isplayed: false
                  });
              });
          }
        });
    }
  }
};
