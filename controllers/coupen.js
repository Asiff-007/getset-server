'use strict';

var qr = require('qr-image'),
    fs = require('fs'),
    mergeImages = require('merge-images'),
    { Canvas, Image } = require('canvas'),
    pdf = require("pdf-creator-node"),
    _ = require('lodash'),
    Promise = require('bluebird');

//var price = require('../models/price');

module.exports = {
  index: function (req, resp) {
    var qrBaseURL = "https://api.getset.shop/game?campaign_id=12&ticket_id=";
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "0",
      localUrlAccess: true,
      timeout: 3000000,
      height: "12in",
      width: "18in",
    };

    // height: "29.7cm",
    // width: "42cm",
    var html = fs.readFileSync("template.html", "utf8");
    var imageArray = [];
    var promises = [];

    _.times(1000, function (k) {
      var key = k + 4001;
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
              // return fs.writeFile(imagePath, base64Data, {encoding: 'base64'}, function (err) {
              //   console.log("writing here");
              //   imageArray.push(imagePath);
              //   return 'finalout' + key + '.png';
              // });
    
              return new Promise(function(resolve, reject) {
                fs.writeFile(imagePath, base64Data, {encoding: 'base64'}, function(err) {
                    if (err) reject(err);
                    //return imagePath;
                    res(imagePath);
                });
              });
            })
          });
        })
      );
    });
    var users = [];
    Promise.all(promises)
      .then(function (finalQRs) {
        _.each(finalQRs, function (finalQR) {
          //html = html.replace('{{image}}', `file://${require.resolve('../' + finalQR)}`);

          users.push({image: "file:///Users/vivek/getset/retail-controller/" + finalQR});
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
          })
          .catch((error) => {
            console.error(error);
          });
      });
    //html = html.replace('{{image}}', `file://${require.resolve('../finalout.png')}`);

    // var imageURL = "file:///Users/vivek/getset/retail-controller/finalout.png";

    // var users = [
    //   {
    //     name: "Shyam",
    //     age: "26",
    //     image: imageURL
    //   },
    //   {
    //     name: "Navjot",
    //     age: "26",
    //     image: imageURL
    //   },
    //   {
    //     name: "Shyam",
    //     age: "26",
    //     image: imageURL
    //   },
    //   {
    //     name: "Navjot",
    //     age: "26",
    //     image: imageURL
    //   }
    // ];
    
    // var document = {
    //   html: html,
    //   data: {
    //     users: users,
    //   },
    //   path: "output.pdf",
    //   type: "",
    //   localUrlAccess: true
    // };

    // pdf
    //   .create(document, options)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
};
