var Room = require('../models/room.js');
var multer  = require('multer');

Room.count({}, function(err, result){
  if (result === 0){
    var room = new Room();
    room.typefr = 'Chambre Simple';
    room.contentfr = 'Vbi curarum abiectis ponderibus aliis tamquam nodum et codicem difficillimum Caesarem convellere nisu valido cogitabat, eique deliberanti cum proximis clandestinis conloquiis et nocturnis qua vi, quibusve commentis id fieret, antequam effundendis rebus pertinacius incumberet confidentia, acciri mollioribus scriptis per simulationem tractatus publici nimis urgentis eundem placuerat Gallum, ut auxilio destitutus sine ullo interiret obstaculo.';
    room.amnetiesfr = ['Free-Wifi', 'Télévision écran-plat', 'Chambre avec baignore', 'Téléphone'];
    room.pricefr = '59€ / nuit';

    room.typeen = 'Single Room';
    room.contenten = 'Vbi curarum abiectis ponderibus aliis tamquam nodum et codicem difficillimum Caesarem convellere nisu valido cogitabat, eique deliberanti cum proximis clandestinis conloquiis et nocturnis qua vi, quibusve commentis id fieret, antequam effundendis rebus pertinacius incumberet confidentia, acciri mollioribus scriptis per simulationem tractatus publici nimis urgentis eundem placuerat Gallum, ut auxilio destitutus sine ullo interiret obstaculo.';
    room.amnetiesen = ['Free-Wifi', 'Flat screen tv', 'Room with bath', 'Phone'];
    room.priceen = '59€ per night';

    room.image = '/img/chambre.png';
    room.save(function (err) {
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


var rooms = {

  getAll: function(req, res) {
    Room.find({}, function(err, results) {
      if (err)
        res.send(err);
      res.json(results);
    });
  },

  getOne: function(req, res) {
    Room.findById({ _id: req.params.id }, function(err, result) {
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
      var room = new Room();
      room.typefr = req.body.typefr;
      room.contentfr = req.body.contentfr;
      room.amnetiesfr = req.body.amnetiesfr.splice(0);
      room.pricefr = req.body.pricefr;

      room.typeen = req.body.typeen;
      room.contenten = req.body.contenten;
      room.amnetiesen = req.body.amnetiesen.splice(0);
      room.priceen = req.body.priceen;


      room.image = '/img/' + req.file.filename;
      room.save(function(err, results) {
        if (err) {
          res.send(err);
          console.log(err);
        }
        else
          res.json(room);
      });
   });
  },

  updateWithImg: function(req, res) {
    upload(req,res,function(err){
      if(err){
         res.json({error_code:1,err_desc:err});
         return;
      }
      Room.findByIdAndUpdate({ _id: req.params.id }, {
        typefr: req.body.typefr,
        contentfr: req.body.contentfr,
        amnetiesfr: req.body.amnetiesfr.splice(0),
        pricefr: req.body.pricefr,
        typeen: req.body.typeen,
        contenten: req.body.contenten,
        amnetiesen: req.body.amnetiesen.splice(0),
        priceen: req.body.priceen,
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
    Room.findByIdAndUpdate({ _id: req.params.id }, {
      typefr: req.body.typefr,
      contentfr: req.body.contentfr,
      amnetiesfr: req.body.amnetiesfr.splice(0),
      pricefr: req.body.pricefr,
      typeen: req.body.typeen,
      contenten: req.body.contenten,
      amnetiesen: req.body.amnetiesen.splice(0),
      priceen: req.body.priceen,
     }, function(err, result) {
      if (err)
        res.send(err);
      else
        res.json(result);
      });
  },

  delete: function(req, res) {
    Room.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post removed!' });
   });
  }
};

module.exports = rooms;
