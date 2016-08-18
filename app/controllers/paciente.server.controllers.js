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
  var paciente = Paciente(req.body);
  paciente.password = password();//generar password
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

exports.eliminar = function(req, res, next){
  var id_paciente = req.params.id;
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
      res.send({mensaje: "usuario no encontrado", error: "true", url: "/"});
      return; // next(err);
    } 
    else {
        if (paciente) {
          res.type("json");
          return res.send({paciente, error: "false",url: "/paciente"});
        }
        else{
          res.send({mensaje: "usuario no encontrado", error: "true", url: "/"});
        }

    }
  });
};
