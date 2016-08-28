var ExamenDisponible = require('mongoose').model('Examenesdisponibles');

exports.crear = function(req, res, next){
  var examenD = ExamenDisponible(req.body);
  examenD.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(examen);
    }
  });
};

exports.enlistar = function(req, res, next){
  ExamenDisponible.find({}, function(err, examenes){
    if(err){
      return next(err);
    } else {
      return res.json(examenes);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_examen = req.params.id;
  ExamenDisponible.remove({ _id: id_examen }, function(err, examen){
    if(err){
      return next(err);
    } else {
      return res.send("El examen se eliminó");
    }
  });
};

exports.porTipo = function(req, res, next){
  var tipo = req.params.tipo;
  ExamenDisponible.find({ "tipo": tipo }, function(err, examenes){
    if(err){
      return next(err);
    } else {
      return res.send(examenes);
    }
  });
};