var mongoose = require('mongoose');
var Product = require('../models/product');
var config = require('./app');

Product.collection.drop();

mongoose.connect(config.databaseUrl);

Product.create([{
  name: "Hazelnut Oil",
  price: 20.00,
  unitSize: "250 ml",
  description: "This oil is the bomb",
  imageUrl:"public/images/hazelnut_oil.jpg"
},{
  name: "Almond Oil",
  price: 15.00,
  unitSize: "250 ml",
  description: "This oil is nearly the bomb",
  imageUrl:"public/images/almond_oil.jpg"
},{
  name: "Walnut Oil",
  price: 30.00,
  unitSize: "250 ml",
  description: "This oil is an overpriced bomb",
  imageUrl:"public/images/walnut_oil.jpg"
}], function(err, products) {
  if(err) console.log(err);
  else console.log(products);
  mongoose.connection.close();
});


// var productIds = shoes.map(function(product){
//   return product._id;
// });