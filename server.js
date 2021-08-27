'use strict';

var logger = require('./modules/debug')('SERVER'),
  express = require('express'),
  path = require('path'),
  body_parser = require('body-parser'),
  app = express(),
  config = require('./resources/config'),
  access_control_dev = require('./modules/access_control_dev'),
  access_control_prod = require('./modules/access_control_prod'),
  validation = require('./modules/validator'),
  response_handler = require('./modules/response');

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json({limit: '10mb'}));
app.use(response_handler);
app.use(validation.express);
app.use(express.static(path.join(__dirname, '/games')));
app.set('views', __dirname + '/games');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// allow cross origin requests for dev mode else Allow specific origins
if (app.get('env') === 'development') {
  app.use(access_control_dev);
} else {
  app.use(access_control_prod);
}

// load controllers
require('./modules/boot')(app);

app.set('port', process.env.PORT || 3002);

// Need this to close connection on server
app.running = app.listen(app.get('port'));

module.exports = app;
