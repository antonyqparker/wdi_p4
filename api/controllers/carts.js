var Cart = require('../models/cart.js');

function cartCreate(req, res){
  Cart.create(req.body, function(err, cart){
    if(err) res.status(500).json({ message: err });
    if(!cart) return res.status(400).json({ message: "Invalid data"});
    return res.status(201).json(cart);
  });
}

function cartUpdate(req, res) {
  Cart.findByIdAndUpdate(req.params.id, req.body, function(err, cart) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(cart);
  });
}

function cartShow(req, res) {
  Cart.findById(req.params.id).populate('products').exec(function(err, cart) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(cart);
  });
}

function cartDelete(req, res) {
  Cart.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}



module.exports = {
  create: cartCreate,
  update: cartUpdate,
  show: cartShow,
  delete: cartDelete
}