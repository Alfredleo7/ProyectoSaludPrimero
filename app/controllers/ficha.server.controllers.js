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
  })
}

exports.enlistar = function(req, res, next){
  Ficha.find({}, function(err, fichas){
    if(err){
      return next(err);
    } else {
      return res.json(fichas);
    }
  })
}

// Julian =====
exports.fichasPorLaboratorio = function(req, res, next){
  Ficha.aggregate( {"$group" : {_id:"$nombreLaboratorio", count:{$sum:1}}} , function(err, fichas){
    if(err){
      return next(err);
    } else {
      return res.json(fichas);
    }
  });
};

// Julian =====
exports.fichasByLabAndMonth = function(req, res, next){
    Ficha.aggregate({"$group": {_id: { "mes":{$substr:['$fecha', 5, 2]} , 'nombre':'$nombreLaboratorio' } , "count": {"$sum":1} }} , function(err, fichas){
    if(err){
      return next(err);
    } else {
      return res.json(fichas);
    }
  });
};

exports.eliminar = function(req, res, next){
  Ficha.remove({_id : req.params.id}, function(err){
    if(err){
      return next(err);
    } else {
      return res.send('se eliminó la ficha');
    }
  });
};
