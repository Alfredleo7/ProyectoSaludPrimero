var Muestra = require('mongoose').model('Muestra');

exports.crear = function(req, res, next){
  var muestra = Muestra(req.body);
  muestra.save(function(err, muest){
    if(err){
      return next(err);
    } else {
      //return res.send('la muestra se guardó correctamente');
      return res.send(muest);
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
  });
};

exports.actualizarMuestra = function(req, res, next){
  var id_Muestra = req.params["id"];
  Muestra.findOneAndUpdate({_id: id_Muestra}, {$set: {nombresPaciente: req.body.nombresPaciente, apellidosPaciente: req.body.apellidosPaciente, id_centro: req.body.id_centro, nombreCentro: req.body.nombreCentro , id_laboratorio: req.body.id_laboratorio , nombreLaboratorio: req.body.nombreLaboratorio, tipo: req.body.tipo, estado: req.body.estado, examenes: req.body.examenes}}, {new: true}, function(err,muestra){
    if(err){
      return next(err);
    } else {
      return res.json(muestra);
    }
  });
};

exports.muestrasRecibidas = function(req, res, next){
  Muestra.find({estado: "recibido"}, function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};

exports.muestraIngresadaByID = function(req, res, next){
  Muestra.findOne({ $and: [ { estado: "ingresado" }, { _id: req.params.id } ] }, function(err, muestra){
    if(err){
      return next(err);
    } else {
      return res.json(muestra);
    }
  });
};


exports.recibirMuestra = function(req, res, next){
  var idMuestra = req.body.id;
  var observaciones = req.body.observaciones;
  Muestra.findOneAndUpdate({_id: idMuestra}, {$set: {estado: "recibido", observaciones: observaciones}}, function(err, muestra){
    if(err){
      return next(err);
    } else {
      return res.send("la muestra fue recibida");
    }
  });
};

exports.enviarResultadosMuestra = function(req, res, next){
  var idMuestra = req.body.id;
  var estado = req.body.estado;
  Muestra.findOneAndUpdate({_id: idMuestra}, {estado: estado}, function(err, muestra){
    if(err){
      return next(err);
    } else {
      return res.send("la muestra fue enviada al paciente");
    }
  });
};

exports.muestrasByIdPaciente = function(req, res, next){
  var idPaciente = req.params.id;
  Muestra.find({id_paciente: idPaciente}, function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};
