var Cart = require('../models/cart.js');

function cartCreate(req, res){
  Cart.create(req.body.cart, function(err, cart){
    if(err) res.status(500).json({ message: err });
    if(!cart) return res.status(400).json({ message: "Invalid data"});
    return res.status(201).json({ cart: cart });
  })
}

function cartShow(req, res) {
    Cart.find({_id: req.params.id}, function(err, cart) {
      if(err) return res.status(500).json({ message: err });
      return res.status(200).json(cart);
    })
  }

module.exports = {
  create: cartCreate,
  show: cartShow
}