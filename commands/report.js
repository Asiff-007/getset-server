var pdf = require('pdf-creator-node');
var fs = require('fs');
var report = require('../models/report');
var nodemailer = require('nodemailer');
var db = require('../dao/db');
var config = require('../resources/config');
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
  index: function () {
    'use strict';
    // Read HTML Template
    var html = fs.readFileSync('report.html', 'utf8');
    var promises = [];
    var options = {
      format: 'A4',
      orientation: 'portrait'
    };
    var week = new Date();
    week.setDate(week.getDate() - 7);
    db.getList({report_status: config.report.report_status.active},'corporate')
     .then(function (corporateList) {
       _.each(corporateList,function (corporate) {
         if (corporate.email !== null) {

           var reports = report.getRecord(corporate.id , week)
            .then(function(res) {
              if (res.status === 'Success') {
                var document = {
                  html: html,
                  data: {
                    datas: res
                  },
                  path: './' + res.corporateName + '.pdf'
                };

                return pdf
                .create(document, options)
                .then(function() {

                  var transporter = nodemailer.createTransport({
                    host: config.report.host,
                    auth: {
                      user: config.report.user,
                      pass: config.report.password
                    }
                  });

                  var mailOptions = {
                    from: config.report.user,
                    to: corporate.email,
                    subject: config.report.subject,
                    text: config.report.text,
                    attachments: [
                      {
                        path:'./' + res.corporateName + '.pdf',
                        contentType: 'application/pdf'
                      }
                    ]
                  };
                  return new Promise(function(resolve, reject) {
                    transporter.sendMail(mailOptions, function(error, info) {
                       if (error) {
                         console.log(error);
                         reject(error);
                       } else {
                         console.log('Email sent: ' + info.response);
                         resolve(info.response);
                       }
                     });
                  });
                })
                .catch(function(error) {
                  console.error(error);
                  return error;
                });
              }
            });
           promises.push(reports);
         }
       });
       Promise.all(promises)
        .then(function () {
          process.exit();
        });
     });
  }
};
