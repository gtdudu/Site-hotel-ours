var Tourism = require('../models/tourism.js');

var tourisms = {

  getAll: function(req, res) {
    Tourism.find({}, function(err, results) {
      if (err)
        res.send(err);
      res.json(results);
    });
  },

  getOne: function(req, res) {
    if (typeof req.params.id !== String)
      res.send("Id must be a string");
    Tourism.findById({ _id: req.params.id }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  create: function(req, res) {
    var tourism = new Tourism();

    if (typeof req.body.title !== String)
      res.send("Title must be a string");
    if (typeof req.body.content !== String)
      res.send("Content must be a string");
    if (typeof req.body.link !== String)
      res.send("Link must be a string");
    if (typeof req.body.images !== String)
      res.send("Image must be a string");

    tourism.title = req.body.title;
    tourism.content = req.body.content;
    tourism.link = req.body.link;
    tourism.images = req.body.images;
    tourism.save(function(err, results) {
      if (err)
        res.send(err);
      res.json(tourism);
    });
  },

  update: function(req, res) {
    if (typeof req.body.id !== String)
      res.send("Id must be a string");
    if (typeof req.body.title !== String)
      res.send("Title must be a string");
    if (typeof req.body.content !== String)
      res.send("Content must be a string");
    if (typeof req.body.link !== String)
      res.send("Link must be a string");
    if (typeof req.body.images !== String)
      res.send("Image must be a string");
    Tourism.findByIdAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      content: req.body.content,
      link: req.body.link,
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
    Tourism.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post removed!' });
   });
  }
};

module.exports = tourisms;
