var mongoose = require('mongoose');
var User = mongoose.model("User");
var Product = mongoose.model("Product");

var cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref:'User' },
  products:[{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});

var Cart = mongoose.model("Cart", cartSchema);



module.exports = Cart;
