var Paciente = require('mongoose').model('Paciente');
var nodemailer = require('nodemailer');

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
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
          user: "salud.primero.sa@gmail.com",
          pass: "grmiqrjhidumlekh"
      }
  });
  var mailOptions = {
        from: "Salud Primero S.A. ✔ <salud.primero.sa@gmail.com>",
        to: req.body.email, 
        subject: "Salud Primero S.A. - Registro de Paciente",
        text: "Estimado "+req.body.nombres+" "+req.body.apellidos+",\n\nBienvenido a Salud Primero S.A.\n\nLe informamos que su cuenta ha sido creada con éxito. Puede ingresar a nuestro sistema utilizando:\nCédula: "+req.body.cedula+"\nContraseña: "+req.body.password+"\n\nAtentamente,\nSalud Primero S.A.\n\nPara más información envíenos un correo electrónico a salud.primero.sa@gmail.com, o acérquese a nuestras oficinas más cercanas."
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }
    });
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
          req.session.idUser = Paciente(paciente)._id;
          req.session.rol = "paciente";
          console.log(req.session);
          res.type("json");
          return res.send({paciente : paciente, error: "false", url: "/paciente"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }
    }
  });
};

exports.pacienteByCookie = function(req, res, next){
  var idPaciente = req.session.idUser;
  Paciente.findById(idPaciente, function(err, paciente){
    if(err){
      return next(err);
    } else {
      return res.json(paciente);
    }
  });
};

exports.cambiarPassword = function(req, res, next){
  var idPaciente = req.session.idUser;
  var pass_old = req.body.passwordold;
  var pass1 = req.body.password1;
  var pass2 = req.body.password2;

  Paciente.findById(idPaciente, function(err,paciente){
    if(err){
      return next(err);
    } else {
      if(pass_old != paciente.password){
        return res.send("Contraseña incorrecta. Intente de nuevo.");
      }
      else if(pass1 != pass2){
        return res.send("No coincide la nueva contraseña. Intente de nuevo.");
      }
      else if(pass_old == paciente.password && pass1 == pass2){
        Paciente.findOneAndUpdate({_id: idPaciente}, {$set: {password: pass1}}, {new: true} ,function(err, paciente){
          if(err){
            return next(err);
          } 
          else {
            var smtpTransport = nodemailer.createTransport("SMTP",{
                service: "Gmail",
                auth: {
                    user: "salud.primero.sa@gmail.com",
                    pass: "grmiqrjhidumlekh"
                }
            });
            var mailOptions = {
                  from: "Salud Primero S.A. ✔ <salud.primero.sa@gmail.com>",
                  to: paciente.email, 
                  subject: "Salud Primero S.A. - Cambio de contraseña",
                  text: "Estimado "+paciente.nombres+" "+paciente.apellidos+",\n\nSalud Primero S.A. le informa que usted ha efectuado un cambio de contraseña. Podrá ingresar a nuestro sistema utilizando sus nuevas credenciales:\nCédula: "+paciente.cedula+"\nContraseña: "+paciente.password+"\n\nAtentamente,\nSalud Primero S.A.\n\nPara más información envíenos un correo electrónico a salud.primero.sa@gmail.com, o acérquese a nuestras oficinas más cercanas."
              }
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }
            });
            res.send("Contraseña modificada con éxito. Vuelva a iniciar sesión.");
          }
        });
      }
      
    }
  });
};

exports.pagPaciente = function(req, res, next){
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  if ( req.session.rol =='paciente') {
    res.render('paciente');
  }
  else {
    res.status(401).send("No autorizado. Por favor inicie sesión para continuar");
  }
}

exports.pagPerfil = function(req, res, next){
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  if ( req.session.rol =='paciente') {
    res.render('perfilUsuario');
  }
  else {
    res.status(401).send("No autorizado. Por favor inicie sesión para continuar");
  }
}

exports.salir = function(req, res, next){
  if (req.session) {
    req.session["rol"] = null;
    res.clearCookie('rol');
    console.log(req.session);
    req.session.destroy(function() {});
  }
  res.redirect('/');
}