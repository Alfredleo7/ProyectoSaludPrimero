var Ficha = require('mongoose').model('Ficha');

exports.crear = function(req, res, next){
  var ficha = Ficha(req.body);

  ficha.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(ficha);
    }
  });
};

exports.fichaByID = function(req, res, next){
  var id_Ficha = req.params["id"];
  Ficha.findById(id_Ficha, function(err,ficha){
    if(err){
      return next(err);
    } else {
      return res.json(ficha);
    }
  });
};

exports.enlistar = function(req, res, next){
  Ficha.find({}, function(err, fichas){
    if(err){
      return next(err);
    } else {
      return res.json(fichas);
    }
  });
};


exports.recibidas = function(req, res, next){
  Ficha.find({estado : "recibido"}, function(err, fichas){
    if(err){
      return next(err);
    } else {
      return res.json(fichas);
    }
  });
};

exports.ficha = function(req, res, next){
  var id_Ficha = req.body.id;
  Ficha.findById(id_Ficha, function(err,ficha){
    if(err){
      return next(err);
    } else {
      return res.json(ficha);
    }
  });
};
