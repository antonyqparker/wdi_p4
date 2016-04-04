var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config/app');
var router = require('./config/routes');

mongoose.connect(config.databaseUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', router);

app.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});