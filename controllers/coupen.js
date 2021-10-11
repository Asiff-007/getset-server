'use strict';

var qr = require('qr-image'),
    fs = require('fs'),
    mergeImages = require('merge-images'),
    { Canvas, Image } = require('canvas'),
    pdf = require("pdf-creator-node"),
    _ = require('lodash'),
    config = require('../resources/config'),
    customId = require("custom-id"),
    Promise = require('bluebird'),
    knex = require('knex');

module.exports = {
  index: function (req, resp) {
    var qrBaseURL = "https://api.getset.shop/game?campaign_id=13&ticket_id=";
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "0",
      localUrlAccess: true,
      timeout: 3000000,
      height: "12in",
      width: "18in",
    };

    var html = fs.readFileSync("template.html", "utf8");
    var promises = [];
    var noOfCoupons = 1000;
    var startId = 5001;

    _.times(noOfCoupons, function (k) {
      var fK = k + startId;
      var key = customId({uniqueId: fK});

      // var qr_svg = qr.image(qrBaseURL + key, { type: 'png', size: 8, margin: 0});
      var qr_svg = qr.image(qrBaseURL + key, { type: 'png', size: 5, margin: 0});
      qr_svg.pipe(fs.createWriteStream('qrs/qr' + key + '.png'));
      
      var svg_string = qr.imageSync(qrBaseURL + key, { type: 'png' });
      promises.push(
        new Promise(function (res, rej) {
          fs.writeFile("out.png", svg_string, 'base64', function(err) {
            // return mergeImages(['Kovilakam.png', {src: 'qrs/qr' + key + '.png', x: 1543.5, y: 805}], {
            // return mergeImages(['KovilakamBig.png', {src: 'qrs/qr' + key + '.png', x: 903.5, y: 610}], {
            // return mergeImages(['Popees.jpg', {src: 'qrs/qr' + key + '.png', x: 1573, y: 812}], {
            // return mergeImages(['PopeesBig.png', {src: 'qrs/qr' + key + '.png', x: 903.5, y: 610}], { 6
            return mergeImages(['PopeesBig.png', {src: 'qrs/qr' + key + '.png', x: 920.5, y: 628}], { // 5
              Canvas: Canvas,
              Image: Image
            })
            .then(function (b64) {
              var base64Data = b64.replace(/^data:image\/png;base64,/, "");
              var imagePath = 'qrs/finalout' + key + '.png';
    
              return new Promise(function(resolve, reject) {
                fs.writeFile(imagePath, base64Data, {encoding: 'base64'}, function(err) {
                    if (err) reject(err);
                    res(key);
                });
              });
            })
          });
        })
      );
    });
    var users = [];
    var userPrices = [];
    Promise.all(promises)
      .then(function (finalQRs) {
        _.each(finalQRs, function (finalQR) {
          users.push({image: "file:///Users/vivek/getset/retail-controller/qrs/finalout" + finalQR + ".png"});
          userPrices.push({
            ticket_id: finalQR
          });
        });

        var document = {
          html: html,
          data: {
            users: users,
          },
          path: "output.pdf",
          type: "",
          localUrlAccess: true
        };

        pdf
          .create(document, options)
          .then((res) => {
            console.log(res);
            var knexInstance = knex(config.db);
            knexInstance('user_price').insert(userPrices)
              .then(function () {console.log("success")})
              .catch(function (err) {console.log("Failed", err)});
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }
};
