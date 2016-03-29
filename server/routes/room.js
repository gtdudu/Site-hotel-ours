var Room = require('../models/room.js');

var rooms = {

  getAll: function(req, res) {
    Room.find({}, function(err, results) {
      if (err)
        res.send(err);
      res.json(results);
    });
  },

  getOne: function(req, res) {
    if (typeof req.params.id !== String)
      res.send("Id must be a string");
    Room.findById({ _id: req.params.id }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  create: function(req, res) {
    var room = new Room();

    if (typeof req.body.type !== String)
      res.send("Type must be a string");
    if (typeof req.body.content !== String)
      res.send("Content must be a string");
    if (typeof req.body.synopsis !== String)
      res.send("Synopsis must be a string");
    if (typeof req.body.price !== Number)
      res.send("Price must be a number");
    if (!Array.isArray(req.body.amneties))
      res.send("Amneties must be an Array");
    else {
      for (var i = 0; i < req.body.amneties.length; i++) {
        if (typeof req.body.amneties[i] !== String)
          res.send("Amneties must be a string");
      }
    }
      // should check what i'm sending from the client: images or image .??
    if (typeof req.body.images !== String)
      res.send("Image must be a string");

    room.type = req.body.type;
    room.synopsis = req.body.synopsis;
    room.content = req.body.content;
    room.price = req.body.price;
    room.images = req.body.images;
    room.amneties = req.body.amneties.splice();
    room.save(function(err, results) {
      if (err)
        res.send(err);
      res.json(room);
    });
  },

  update: function(req, res) {
    if (typeof req.body.id !== String)
      res.send("Id must be a string");
    if (typeof req.body.type !== String)
      res.send("Type must be a string");
    if (typeof req.body.synopsis !== String)
      res.send("Synopsis must be a string");
    if (typeof req.body.content !== String)
      res.send("Content must be a string");
    if (typeof req.body.price !== Number)
      res.send("Price must be a number");
    if (!Array.isArray(req.body.amneties))
      res.send("Amneties must be an Array");
    else {
      for (var i = 0; i < req.body.amneties.length; i++) {
        if (typeof req.body.amneties[i] !== String)
          res.send("Amneties must be a string");
      }
    }      // should check what i'm sending from the client: images or image .??
    if (typeof req.body.images !== String)
      res.send("Image must be a string");
    Room.findByIdAndUpdate({ _id: req.params.id }, {
      type: req.body.type,
      synopsis: req.body.synopsis,
      content: req.body.content,
      price: req.body.price,
      amneties: req.body.amneties.splice(), 
      images: req.body.images

    }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  delete: function(req, res) {
    if (typeof req.body.id !== String)
      res.send("Id must be a string");
    Room.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post removed!' });
   });
  }
};

module.exports = rooms;
