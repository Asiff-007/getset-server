'use strict';
var Class = require('js-class'),
    config = require('../resources/config'),
    report = require('../dao/report'),
    _ = require('lodash');

module.exports = new (Class({ //jshint ignore:line
    getRecord: function(id,date) {
        var outletName,
            totalPlayers,
            totalWinners,
            claimedPrizes = [],
            mostClaimedPrizes = [],
            dayCounts = [],
            timeCounts = [],
            mostPlayedTime,
            mostPlayedDay,
            day = [],
            time = [],
            options = { weekday: 'long'},
            h,m,ampm1,ampm2;

        return report.getData(id , date)
            .then(function(data){

                outletName = data[0].outletName;
                totalPlayers = _.filter(data,['played',1]).length;
                totalWinners = _.filter(data, function(data){
                    return data.priceId > 0;
                }).length;

                claimedPrizes = _.filter(data,['claimStatus',config.price_status.not_claimed]);
                _.forIn(_.countBy(claimedPrizes,'priceName'), function(value, key) {
                    mostClaimedPrizes.push({ "priceName": key, "count": value });
                });

                _.forIn(_.map(data,'playedDate'), function(value) {
                    day.push({"day": new Intl.DateTimeFormat('en-US', options).format(value) });
                    h = value.getHours();
                    m = value.getMinutes();
                    ampm1 = h >= 12 ? 'PM' : 'AM';
                    ampm2 = ampm1;
                    h = h % 12 ;
                    h = h ? h : 12;
                    if (h == 11 && m > 30) {
                        if (ampm1 == 'am') {
                            ampm2 = 'pm'
                        }else {
                            ampm2 = 'am'
                        }
                    }
                    if (m > 30) {
                        time.push({"time" : h + ':30 '+ampm1+' - '+ (h+1) + ':00 '+ampm2});
                    }
                    else {
                        time.push({"time" :h + ':00 '+ampm1+' - ' + h + ':30 '+ampm2});
                    }
                });

                _.forIn(_.countBy(day,'day'), function(value, key) {
                    dayCounts.push({ "day": key, "count": value });
                });

                _.forIn(_.countBy(time,'time'), function(value, key) {
                    timeCounts.push({ "time": key, "count": value });
                });

                mostPlayedDay = _.orderBy(dayCounts,['count'],'desc')[0];
                mostPlayedTime = _.orderBy(timeCounts,['count'],'desc')[0];
                
                return {
                    outletName,
                    totalPlayers,
                    totalWinners,
                    mostClaimedPrizes,
                    mostPlayedDay,
                    mostPlayedTime
                };
            })
    }
}))();