var Muestra = require('mongoose').model('Muestra');

exports.crear = function(req, res, next){
  var muestra = Muestra(req.body);
  muestra.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.send('la muestra se guardó correctamente');
    }
  });
};

exports.enlistar = function(req, res, next){
  Muestra.find({}, function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};

exports.eliminar = function(req, res, next){
  Muestra.remove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    } else {
      return res.send('se eliminó la muestra');
    }
  });
};

// Julian =====
exports.muestrasPorLaboratorio = function(req, res, next){
  Muestra.aggregate( {"$group" : {_id:"$nombreLaboratorio", count:{$sum:1}}} , function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};

// Julian =====
exports.muestrasByLabAndMonth = function(req, res, next){
    Muestra.aggregate({"$group": {_id: { "mes":{$substr:['$fecha', 5, 2]} , 'nombre':'$nombreLaboratorio' } , "count": {"$sum":1} }} , function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};

exports.muestraByID = function(req, res, next){
  var id_Muestra = req.params["id"];
  Muestra.findById(id_Muestra, function(err,muestra){
    if(err){
      return next(err);
    } else {
      return res.json(muestra);
    }
  })
}