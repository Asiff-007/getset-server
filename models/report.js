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
            dayCounts = [],
            timeCounts = [],
            mostActiveShop = [],
            mostPlayedTime,
            mostPlayedDay,
            day = [],
            time = [],
            chartPlayers = [],
            chartClaimed = [],
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            options = { weekday: 'long'},
            generatedOn,
            h,h2,m,ampm1,ampm2;

        return report.getData(id , date)
            .then(function(data){

                corporateName = data[0].corporateName;
                totalPlayers = _.filter(data,['played',1]).length;
                totalWinners = _.filter(data, function(data){
                    return data.priceId > 0;
                }).length;

                claimedPrizes = _.filter(data,['claimStatus',config.price_status.not_claimed]);
                _.forIn(_.countBy(claimedPrizes,'priceName'), function(value, key) {
                    mostClaimedPrizes.push({ "priceName": key, "count": value });
                });

                _.forIn(data, function(value) {
                    day.push({"day": new Intl.DateTimeFormat('en-US', options).format(value.playedDate), "status": value.claimStatus });
                    h = value.playedDate.getHours();
                    m = value.playedDate.getMinutes();
                    ampm1 = h >= 12 ? 'PM' : 'AM';
                    ampm2 = h >=11 && h < 23 ? 'PM' : 'AM';
                    h = h % 12 ;
                    h = h ? h : 12;
                    h2 = h == 12 ? 0 : (h+1);
                    time.push({"time" : h + ':00 '+ampm1+' - '+ h2 + ':00 '+ampm2});
                });

                _.forIn(_.countBy(day,'day'), function(value, key) {
                    var dayClaimed = _.filter(_.filter(day,['status',config.price_status.claimed]),['day' ,key]).length;
                    dayCounts.push({ "day": key, "players": value ,"claimed":dayClaimed});
                });

                _.forIn(_.countBy(time,'time'), function(value, key) {
                    timeCounts.push({ "time": key, "count": value });
                });

                mostPlayedDay = _.orderBy(dayCounts,['count'],'desc')[0];
                mostPlayedTime = _.orderBy(timeCounts,['count'],'desc')[0];

                _.forIn(_.countBy(data,'shopName'), function(value, key) {
                    var shopClaimed = _.filter(claimedPrizes,['shopName',key]).length;
                    shops.push({ "shopName": key, "players": value ,"claimed": shopClaimed});
                });

                _.forIn(days, function(value, key) {
                    var d = _.filter(dayCounts,['day',value]);
                    if(d.length > 0) {
                        chartPlayers.push(d[0].players);
                        chartClaimed.push(d[0].claimed);

                    }
                    else {
                        chartPlayers.push(0);
                        chartClaimed.push(0);
                    }
                });

                mostActiveShop = _.orderBy(shops,['players'],'desc').slice(0,5);
                mostClaimedPrizes = _.orderBy(mostClaimedPrizes,['count'],'desc').slice(0,5);

                generatedOn = new Date().toLocaleString();
                
                return {
                    corporateName,
                    totalPlayers,
                    totalWinners,
                    mostClaimedPrizes,
                    mostPlayedDay,
                    mostPlayedTime,
                    mostActiveShop,
                    chartPlayers,
                    chartClaimed,
                    generatedOn
                };
            })
    }
}))();