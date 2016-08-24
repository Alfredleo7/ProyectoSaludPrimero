var Parametro = require('mongoose').model('Parametro');

exports.crear = function(req, res, next){
  var parametro = Parametro(req.body);
  parametro.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(parametro);
    }
  });
};

exports.enlistar = function(req, res, next){
  Parametro.find({}, function(err, parametros){
    if(err){
      return next(err);
    } else {
      return res.json(parametros);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_parametro = req.params.id;
  Parametro.remove({_id: id_parametro}, function(err,parametro){
    if(err){
      return next(err);
    } else {
      return res.send("El parámetro se eliminó");
    }
  });
};

exports.parametrosByExamen = function(req, res, next){
  Parametro.find({id_examen: req.params.id}, function(err, parametros){
    if(err){
      return next(err);
    } else {
      return res.json(parametros);
    }
  });
};
