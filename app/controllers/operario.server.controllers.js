var Operario = require('mongoose').model('Operario');

exports.crear = function(req, res, next){
  var operario = Operario(req.body);
  //operario.password = password();//generar password
  operario.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(operario);
    }
  });
};

exports.enlistar = function(req, res, next){
  Operario.find({}, function(err, operarios){
    if(err){
      return next(err);
    } else {
      return res.json(operarios);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_operario = req.params.id;
  Operario.remove({_id: id_operario}, function(err, operario){
    if(err){
      return next(err);
    } else {
      return res.send("se eliminó el operario");
    }
  });
};

exports.operarioByCedulaContraseña = function(req, res, next){
  var cedula = req.body.cedula;
  var password = req.body.password;

  Operario.findOne({ $and: [ { cedula: cedula }, { password: password } ] }, function(err, operario){
    if(err){
      res.send({mensaje: "Error en la consuta. Intente de nuevo.", error: "true", url: "/"});
      return; // next(err);
    } 
    else {
        if (operario) {
          res.type("json");
          return res.send({operario, error: "false", url: "/operario"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }

    }
  });
};
