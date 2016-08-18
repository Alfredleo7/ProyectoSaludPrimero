var Laboratorio = require('mongoose').model('Laboratorio');

exports.crear = function(req, res, next){
  var laboratorio = Laboratorio(req.body);
  laboratorio.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(laboratorio);
    }
  });
};

exports.enlistar = function(req, res, next){
  Laboratorio.find({}, function(err, laboratorios){
    if(err){
      return next(err);
    } else {
      return res.json(laboratorios);
    }
  });
};


exports.eliminar = function(req, res, next){
  var id_laboratorio = req.params.id;
  Laboratorio.remove({_id: id_laboratorio}, function(err, paciente){
    if(err){
      return next(err);
    } else {
      return res.send("el laboratorio se eliminó");
    }
  });
};
