var pdf = require('pdf-creator-node');
var fs = require('fs');
var report = require('../models/report');
var nodemailer = require('nodemailer');
var db = require('../dao/db');
var config = require('../resources/config');
var _ = require('lodash');

module.exports = {
  index: function () {
    'use strict';
    // Read HTML Template
    var html = fs.readFileSync('report.html', 'utf8');
    var options = {
      format: 'A4',
      orientation: 'portrait'
    };
    var week = new Date();
    week.setDate(week.getDate() - 100);
    db.getList({report_status: config.report.report_status.active},'corporate')
     .then(function (corporateList) {
       _.each(corporateList,function (corporate) {
         if (corporate.email !== null) {
           report.getRecord(corporate.id , week)
           .then(function(res) {

             var document = {
               html: html,
               data: {
                 datas: res
               },
               path: './report.pdf'
             };

             pdf
             .create(document, options)
             .then(function(res) {
               console.log(res);

               var transporter = nodemailer.createTransport({
                 service: 'gmail',
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
                     path:'./report.pdf',
                     contentType: 'application/pdf'
                   }
                 ]
               };
               transporter.sendMail(mailOptions, function(error, info) {
                 if (error) {
                   console.log(error);
                   process.exit();
                 } else {
                   console.log('Email sent: ' + info.response);
                   process.exit();
                 }
               });
             })
             .catch(function(error) {
               console.error(error);
               process.exit();
             });
           });
         }
       });
     });
  }
};
