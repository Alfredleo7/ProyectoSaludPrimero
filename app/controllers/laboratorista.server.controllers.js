var Laboratorista = require('mongoose').model('Laboratorista');

exports.crear = function(req, res, next){
  var laboratorista = Laboratorista(req.body);
  //laboratorista.password = password();//generar password
  laboratorista.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(laboratorista);
    }
  });
};

exports.enlistar = function(req, res, next){
  Laboratorista.find({}, function(err, laboratoristas){
    if(err){
      return next(err);
    } else {
      return res.json(laboratoristas);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_laboratorista = req.params.id;
  Laboratorista.remove({_id: id_laboratorista}, function(err, laboratorista){
    if(err){
      return next(err);
    } else {
      return res.send("se eliminó el laboratorista");
    }
  });
};

exports.laboratoristaByCedulaContraseña = function(req, res, next){
  var cedula = req.body.cedula;
  var password = req.body.password;

  Laboratorista.findOne({ $and: [ { cedula: cedula }, { password: password } ] }, function(err, laboratorista){
    if(err){
      res.send({mensaje: "Error en la consuta. Intente de nuevo.", error: "true", url: "/"});
      return; // next(err);
    } 
    else {
        if (laboratorista) {
          res.type("json");
          return res.send({laboratorista, error: "false", url: "/laboratorista"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }

    }
  });
};