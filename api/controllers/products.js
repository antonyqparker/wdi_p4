var Product = require('../models/product');

function productsIndex(req, res){
  Product.find(function(err, products){
    if(err) return res.status(500).json({ messsage: err});
    return res.status(200).json(products);
  });
}

function productsCreate(req, res){
  Product.create(req.body, function(err, product){
    if(err) res.status(500).json({ message: err });
    if(!product) return res.status(400).json({ message: "Invalid data"});
    return res.status(201).json(product);
  });
}

function productsShow(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(product);
  });
}

function productsUpdate(req, res){
  Product.findByIdAndUpdate(req.params.id, req.body, function(err, product) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(product);
  });
}


function productsDelete(req, res){
  Product.findByIdAndRemove(req.params.id, function(err, product) {
      if (err) return res.status(500).json({message:err});
      return res.status(200).json(product);
  });
}

module.exports = {
  index: productsIndex,
  create: productsCreate,
  show: productsShow,
  update: productsUpdate,
  delete: productsDelete
};