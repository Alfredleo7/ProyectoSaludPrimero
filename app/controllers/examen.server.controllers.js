var Examen = require('mongoose').model('Examen');

exports.crear = function(req, res, next){
  var examen = Examen(req.body);
  examen.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(examen);
    }
  });
};

exports.enlistar = function(req, res, next){
  Examen.find({}, function(err, examenes){
    if(err){
      return next(err);
    } else {
      return res.json(examenes);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_examen = req.params.id;
  Examen.remove({ _id: id_examen }, function(err, examen){
    if(err){
      return next(err);
    } else {
      return res.send("El examen se eliminó");
    }
  });
};

exports.porTipo = function(req, res, next){
  var tipo = req.params.tipo;
  Examen.find({ "tipo": tipo }, function(err, examenes){
    if(err){
      return next(err);
    } else {
      return res.send(examenes);
    }
  });
};