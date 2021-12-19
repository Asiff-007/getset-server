'use strict';
var Class = require('js-class'),
    config = require('../resources/config'),
    report = require('../dao/report'),
    _ = require('lodash');

module.exports = new (Class({ //jshint ignore:line
  getRecord: function(id,date) {
    var corporateName,
        totalPlayers,
        totalWinners,
        claimedPrizes = [],
        mostClaimedPrizes = [],
        shops = [],
        mostActiveShop = [],
        mostPlayedTime,
        mostPlayedDay,
        day = [],
        time = [],
        chartPlayers = [],
        chartClaimed = [],
        reportPeriod,
        days =
        [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        generatedOn,
        prizeClaimed = config.price_status.claimed,
        h,h2,ampm1,ampm2;
    return report.getData(id , date)
        .then(function(data) {
          if (data.length > 0) {
            corporateName = data[0].corporateName;
            totalPlayers = _.filter(data,['played',1]).length;
            totalWinners = _.filter(data, function(data) {
              return data.priceId > 0;
            }).length;
            claimedPrizes = _.filter(data,
                [
                    'claimStatus',prizeClaimed
                ]);
            _.forIn(_.countBy(claimedPrizes,'priceName'),
                function(value, key) {
                  mostClaimedPrizes.push(
                      {
                        priceName: key,
                        count: value
                      });
                });
            _.forIn(data, function(value) {
              var dayAt = days[(value.playedDate.getDay() + 6) % 7];
              var findDay = day.find(function(val) {
                if (val.day === dayAt) {
                  if (value.claimStatus === prizeClaimed) {
                    val.claimed = val.claimed + 1;
                  }
                  val.players = val.players + 1;
                  return true;
                }else {
                  return false;
                }
              });
              if (!findDay) {
                var claimed = 0;
                if (value.claimStatus === prizeClaimed) {
                  claimed = 1;
                }
                day.push(
                    {
                      day: dayAt,
                      players: 1,
                      claimed: claimed
                    });
              }
              h = value.playedDate.getHours();
              ampm1 = h >= 12 ? 'PM' : 'AM';
              ampm2 = h >=11 && h < 23 ? 'PM' : 'AM';
              h = h % 12 ;
              h = h ? h : 12;
              h2 = h === 12 ? 0 : (h + 1);
              var timeAt = h + ':00 ' + ampm1 + ' - ' + h2 + ':00 ' + ampm2;
              var findTime = time.find(function(val) {
                if (val.time === timeAt) {
                  val.count = val.count + 1;
                  return true;
                }else {
                  return false;
                }
              });
              if (!findTime) {
                time.push({time: timeAt, count: 1});
              }
            });
            mostPlayedDay = _.orderBy(day,['players'],'desc')[0];
            mostPlayedTime = _.orderBy(time,['count'],'desc')[0];
            _.forIn(_.countBy(data,'shopId'), function(value, key) {
              var shopClaimed = _.filter(claimedPrizes,
                  [
                      'shopId',parseInt(key)
                  ])
                  .length;
              shops.push(
                  {
                    shopId:key,
                    shopName: _.filter(data,
                      [
                          'shopId',parseInt(key)
                      ])[0].shopName,
                    players: value ,
                    claimed: shopClaimed
                  });
            });
            _.forIn(days, function(value) {
              var d = _.filter(day,['day',value]);
              if (d.length > 0) {
                chartPlayers.push(d[0].players);
                chartClaimed.push(d[0].claimed);
              }else {
                chartPlayers.push(0);
                chartClaimed.push(0);
              }
            });
            mostActiveShop = _.orderBy(shops,['players'],'desc').slice(0,4);
            mostClaimedPrizes = _.orderBy(
                mostClaimedPrizes,
                ['count'],
                'desc')
                .slice(0,4);
            generatedOn = new Date().toLocaleString();
            reportPeriod = {
                start:(new Date(date).toLocaleDateString().split(',')[0]),
                end:new Date().toLocaleDateString().split(',')[0]
              };
            return {
              status:'Success',
              corporateName: corporateName,
              totalPlayers: totalPlayers,
              totalWinners: totalWinners,
              mostClaimedPrizes: mostClaimedPrizes,
              mostPlayedDay: mostPlayedDay,
              mostPlayedTime: mostPlayedTime,
              mostActiveShop: mostActiveShop,
              chartPlayers: chartPlayers,
              chartClaimed: chartClaimed,
              generatedOn: generatedOn,
              reportPeriod: reportPeriod
            };
          }else {
            return {
              status:'Failed'
            };
          }
        });
  }
}))();
