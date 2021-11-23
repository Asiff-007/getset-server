var pdf = require("pdf-creator-node");
var fs = require("fs");
var util = require('../modules/util');
var report = require('../models/report');

module.exports = {
    index: function (req, resp) {

// Read HTML Template
var html = fs.readFileSync("report.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",

};
var week ;
week = new Date();
week.setDate(week.getDate()-18);

report.getRecord(1 , week)
  .then(function(res){

    var document = {
      html: html,
      data: {
        datas: res,
      },
      path: "./report.pdf",
      type: "",
    };
  
    pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  })
  
}}