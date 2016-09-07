var Muestra = require('mongoose').model('Muestra');

exports.crear = function(req, res, next){
  var muestra = Muestra(req.body);
  muestra.save(function(err, muest){
    if(err){
      return next(err);
    } else {
      //return res.send('la muestra se guardó correctamente');
      return res.json(muest);
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
exports.enlistarIngresadas = function(req, res, next){
  Muestra.find({estado: 'Ingresado'}, function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
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
exports.muestrasByLabInMonth = function(req, res, next){
  var year = req.query["anio"];
  var month = req.query["mes"];
  Muestra.aggregate( [{"$match": {"fecha":{"$gte": new Date(year+"-"+month+"-01") , "$lte": new Date(year+"-"+month+"-31") }}},{"$group" : {_id:"$nombreLaboratorio", count:{$sum:1}}}] , function(err, muestras){
    if(err){
      return next(err);
    } else {
      return res.json(muestras);
    }
  });
};

// Julian =====
exports.muestrasByYearAndMonth = function(req, res, next){
  var from = req.query["from"];
  var to = req.query["to"];
  Muestra.aggregate( [{"$match": {"fecha":{"$gte": new Date(from+"-01") , "$lte": new Date(to+"-31") }}},{"$group": {_id: { "anio":{ $substr:['$fecha',0,4] }, "mes":{ $substr:['$fecha',5,2] }},"count": {"$sum":1}}},{$sort:{"_id.anio": 1, "_id.mes": 1}}] , function(err, muestras){
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
  var idMuestra = req.params["id"];
  Muestra.findOneAndUpdate({_id: idMuestra}, {$set : {estado: "terminado"}}, function(err, muestra){
    if(err){
      return next(err);
    } else {
      console.log(muestra._id);
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
