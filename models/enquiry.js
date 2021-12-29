'use strict';

var Class = require('js-class'),
    db = require('../dao/db'),
    config = require('../resources/config'),
    nodemailer = require('nodemailer'),
    tableName = 'enquiry';

module.exports = new (Class({ //jshint ignore:line
  create: function (model) {
    return db.save(model,tableName)
      .then(function () {
        var transporter = nodemailer.createTransport({
          service: config.report.service,
          auth: {
            user: config.report.user,
            pass: config.report.password
          }
        });

        var mailOptions = {
          from: config.report.user,
          to: config.report.user,
          subject: config.report.subject,
          text: 'Name  : ' + model.name +
          '\nContact Number : ' + model.contact_number
        };
        transporter.sendMail(mailOptions);
        return {
          status: 'Data inserted'
        };
      })
      .catch(function () {
        return {
          status: 'Failed',
          error: 'Data insertion failed'
        };
      });
  }
}))();

