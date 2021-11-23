'use strict';

var Class = require('js-class'),
  knex = require('knex'),
  config = require('../resources/config');

module.exports = new (Class({ //jshint ignore:line

  constructor: function () {
    this.knexInstance = knex(config.db);
  },
  getData: function(id,date){
    return this.knexInstance('corporate')
    .innerJoin('shop', 'corporate.id', '=', 'shop.corporate_id')
    .innerJoin('campaign', 'shop.id', '=', 'campaign.shop_id')
    .innerJoin('user_price', 'campaign.id', '=', 'user_price.campaign_id')
    .leftJoin('price', 'user_price.price_id', '=', 'price.id')
    .where('corporate.id',id)
    .andWhere('user_price.price_won_on','>',date)
    .select(
        'corporate.name as outletName',
        'corporate.email as email',
        'shop.id as shopId',
        'shop.name as shopName',
        'user_price.price_id as priceId',
        'price.name as priceName',
        'user_price.id as userPriceId',
        'user_price.price_won_on as playedDate',
        'user_price.claim_status as claimStatus',
        'user_price.played as played'
    )
    .then(function (data) {
      return data;
    });
  }
}))();