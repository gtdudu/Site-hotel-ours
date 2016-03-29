var Offre = require('../models/offre.js');
var multer  = require('multer');

Offre.count({}, function(err, result){
  if (result === 0){
    var etape = new Offre();
    etape.title = 'offre I';
    etape.content = 'Vbi curarum abiectis ponderibus aliis tamquam nodum et codicem difficillimum Caesarem convellere nisu valido cogitabat, eique deliberanti cum proximis clandestinis conloquiis et nocturnis qua vi, quibusve commentis id fieret, antequam effundendis rebus pertinacius incumberet confidentia, acciri mollioribus scriptis per simulationem tractatus publici nimis urgentis eundem placuerat Gallum, ut auxilio destitutus sine ullo interiret obstaculo.';
    etape.image = '/img/chambre.png';
    etape.save(function (err) {
      if (err)
        throw err;
    });

  }
});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './client/assets/img/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
        // cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


var offres = {

  getAll: function(req, res) {
    Offre.find({}, function(err, results) {
      if (err)
        res.send(err);
      res.json(results);
    });
  },

  getOne: function(req, res) {
    Offre.findById({ _id: req.params.id }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  },

  create: function(req, res) {
    upload(req,res,function(err){
      if(err){
         res.json({error_code:1,err_desc:err});
         return;
      }
      var offre = new Offre();
      offre.title = req.body.title;
      offre.content = req.body.content;
      offre.image = '/img/' + req.file.filename;
      offre.save(function(err, results) {
        if (err) {
          res.send(err);
          console.log(err);
        }
        else
          res.json(offre);
      });
   });
  },

  updateWithImg: function(req, res) {
    upload(req,res,function(err){
      if(err){
         res.json({error_code:1,err_desc:err});
         return;
      }
      Offre.findByIdAndUpdate({ _id: req.params.id }, {
       title: req.body.title,
       content: req.body.content,
       image: '/img/' + req.file.filename
     }, function(err, result) {
      if (err)
        res.send(err);
      else
        res.json(result);
      });
   });

 },

  update: function(req, res) {
    Offre.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, content: req.body.content }, function(err, result) {
      if (err)
        res.send(err);
      else
        res.json(result);
      });
  },

  delete: function(req, res) {
    Offre.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post removed!' });
   });
  }
};

module.exports = offres;
