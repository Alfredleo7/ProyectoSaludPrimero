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
