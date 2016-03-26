var User = require('../models/user.js');
var jwt = require('jwt-simple');

// creates two users if database is empty
User.count({}, function(err, result){
  if (result === 0){
    var admin = new User();
    admin.username = 'mastermind';
    admin.password = 'mastermind';
    admin.role = 'admin';
    admin.save(function (err) {
      if (err)
      throw err;
    });
    var dummy = new User();
    dummy.username = 'dummy';
    dummy.password = 'dummy';
    dummy.role = 'user';
    dummy.save(function (err) {
      if (err)
      throw err;
    });

  }
});

var users = {

  getAll: function(req, res) {
    User.find({}, '-password', function(err, results) {
      if (err)
      res.send(err);
      res.json(results);
    });
  },

  getOne: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err)
      res.send(err);
      res.json(user);
    });
  },

  create: function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.role = 'user';
    user.save(function(err, result) {
      if (err)
      res.send(err);
      res.json(user);
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, role: req.body.role }, function(err, result) {
      if (err)
      res.send(err);
      res.json(result);
    });
  },

  delete: function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Article removed!' });
    });
  },

  login : function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "No way, Invalid credentials"
      });
      return;
    }

    User.findOne({username: username}, '-_id password username role',
    function(err, user) {
      if(err || user === null) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "invalid credentials"
        });
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err)
          throw err;
          if (isMatch) {
            var tmpUser = {
              username: user.username,
              role: user.role
            };
            res.json(genToken(tmpUser));
          }
          else {
            res.status(401);
            res.json({
              "status": 401,
              "message": "invalid credentials"
            });
          }
        });
      }
    });
  }
};

function genToken(user) {
  var expires = expiresIn(2);
  var token = jwt.encode({
    iss: 'Identity Provider',
    exp: expires,
    sub: user
  }, require('../config/secret')());

  return {
    token: token,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = users;
