var User = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, users) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(users);
  });
}

function usersCreate(req, res){
  User.create(req.body, function(err, user){
    if(err) res.status(500).json({ message: err });
    if(!user) return res.status(400).json({ message: "Invalid data"});
    return res.status(201).json(user);
  })
}

function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(user);
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

module.exports = {
  create: usersCreate,
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};