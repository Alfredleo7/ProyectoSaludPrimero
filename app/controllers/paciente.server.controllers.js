var Paciente = require('mongoose').model('Paciente');

function password() {
  var iteration = 0;
  var password = "";
  var randomNumber;
  while(iteration < 8){
    randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
    if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
    if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
    if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
    if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
    iteration++;
    password += String.fromCharCode(randomNumber);
  }
  return password;
}

exports.crear = function(req, res, next){
  req.body.password = password();//generar password
  var paciente = Paciente(req.body);
  paciente.save(function(err){
    if(err){
      return next(err);
    } else {
      return res.json(paciente);
    }
  });
};

exports.enlistar = function(req, res, next){
  Paciente.find({}, function(err, pacientes){
    if(err){
      return next(err);
    } else {
      return res.json(pacientes);
    }
  });
};

exports.getById = function(req, res, next){
  var id_paciente = req.params["id"];
  Paciente.findById(id_paciente, function(err, paciente){
    if(err){
      return next(err);
    } else {
      return res.json(paciente);
    }
  });
};

exports.actualizarPaciente = function(req, res, next){
  var id_paciente = req.params["id"];
  Paciente.findOneAndUpdate({_id: id_paciente}, {$set: {nombres: req.body.nombres, apellidos: req.body.apellidos, cedula: req.body.cedula, email: req.body.email}}, {new: true} ,function(err, paciente){
    if(err){
      return next(err);
    } else {
      return res.json(paciente);
    }
  });
};

exports.eliminar = function(req, res, next){
  var id_paciente = req.params["id"];
  Paciente.remove({_id: id_paciente}, function(err, paciente){
    if(err){
      return next(err);
    } else {
      return res.send("se eliminó el paciente");
    }
  });
};

exports.pacienteByCedulaContraseña = function(req, res, next){
  var cedula = req.body.cedula;
  var password = req.body.password;

  Paciente.findOne({ $and: [ { cedula: cedula }, { password: password } ] }, function(err, paciente){
    if(err){
      res.send({mensaje: "Error en la consuta. Intente de nuevo.", error: "true", url: "/"});
      return; // next(err);
    }
    else {
        if (paciente) {
          res.type("json");
          return res.send({paciente : paciente, error: "false", url: "/paciente"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }

    }
  });
};
