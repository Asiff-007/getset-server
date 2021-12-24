'use strict';

var enquiry = require('../models/enquiry');
var config = require('../resources/config');
var nodemailer = require('nodemailer');
module.exports = {
  create:function (req, resp) {
    var rules = {
        name: {type: 'string', required: true},
        contact_number: {type: 'string', required: true}
      };

    if (req.validate(rules)) {
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
        text: 'Name  : ' + req.body.name +
        '\nContact Number : ' + req.body.contact_number
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          enquiry.create(req.body)
          .then(resp.success, resp.error);
        }
      });
    }
  }
};
