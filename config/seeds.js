var mongoose = require('mongoose');
var Product = require('../models/product');

Product.collection.drop();

mongoose.connect('mongodb://localhost/cbfarms');

Product.create([{
  name: "Hazelnut Oil",
  price: 20.00,
  unitSize: "250 ml",
  description: "This oil is the bomb",
},{
  name: "Almond Oil",
  price: 15.00,
  unitSize: "250 ml",
  description: "This oil is nearly the bomb",
},{
  name: "Pistachio Oil",
  price: 30.00,
  unitSize: "250 ml",
  description: "This oil is an overpriced bomb",
}]);


// var productIds = shoes.map(function(product){
//   return product._id;
// });