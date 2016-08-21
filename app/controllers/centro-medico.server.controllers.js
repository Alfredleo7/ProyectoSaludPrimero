var CentroMedico = require('mongoose').model('CentroMedico');

exports.crear = function(req, res, next){
  var centroMedico = CentroMedico(req.body);
  centroMedico.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(centroMedico);
    }
  });
};

exports.enlistar = function(req, res, next){
  CentroMedico.find({}, function(err, centrosMedicos){
    if(err){
      return next(err);
    } else {
      return res.json(centrosMedicos);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_centroMedico = req.params["id"];
  CentroMedico.remove(id_centroMedico, function(err){
    if(err){
      return next(err);
    } else {
      return res.send("Se eliminó con éxito");
    }
  });
};

exports.centroByID = function(req, res, next){
  var idCentro = req.params.id;
  CentroMedico.findById(idCentro, function(err, centro){
    if(err){
      return next(err);
    } else {
      return res.json(centro);
    }
  });
};
