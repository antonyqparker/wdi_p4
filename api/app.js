var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var config = require('./config/app');
var router = require('./config/routes');
var stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

mongoose.connect(config.databaseUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', router);

app.post('/payment', function(req, res) {
  var token = req.body.token;

  var charge = stripe.charges.create({
    amount: parseInt(parseFloat(req.body.amount * 100), 10),
    currency: req.body.currency,
    source: token,
    description: 'TEST'
  }, function(err, charge) {
    if(err) {
      return res.status(500).json({ message: err })
    }
    res.status(200).json({ message: "Payment successful" });
  });
});

app.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});