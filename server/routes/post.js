var Post = require('../models/post.js');

var posts = {

  getAll: function(req, res) {
    Post.find({}, function(err, results) {
      if (err)
        res.send(err);

      res.json(results);
    });
  },

  getOne: function(req, res) {
    Post.findById({ _id: req.params.id }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  create: function(req, res) {
    var post = new Post();

    post.title = req.body.title;
    post.content = req.body.content;
    post.images = req.body.images;
    post.save(function(err, results) {
      if (err)
        res.send(err);
      res.json(post);
    });
  },

  update: function(req, res) {
    Post.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, content: req.body.content }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
      });
  },

  delete: function(req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post removed!' });
   });
  }
};

module.exports = posts;
