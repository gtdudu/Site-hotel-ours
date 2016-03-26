var Gallery = require('../models/gallery.js');

var galleries = {

  getAll: function(req, res) {
    Gallery.find({}, function(err, results) {
      if (err)
        res.send(err);

      res.json(results);
    });
  },

  getOne: function(req, res) {
    Gallery.findById({ _id: req.params.id }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  create: function(req, res) {
    var gallery = new Gallery();

    gallery.title = req.body.title;
    gallery.images = req.body.images;
    gallery.save(function(err, results) {
      if (err)
        res.send(err);
      res.json(gallery);
    });
  },

  update: function(req, res) {
    Gallery.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, images: req.body.images }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
      });
  },

  delete: function(req, res) {
    Gallery.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Gallery removed!' });
   });
  }
};

module.exports = galleries;
