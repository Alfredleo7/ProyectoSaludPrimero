var Operario = require('mongoose').model('Operario');
var qr = require('qr-image');

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


exports.pagOperario = function(req, res, next){
  var role = req.session["rol"];
  
  if ( role =='operario') {
    
    console.log(req.session);

    res.render('operario');  
  }
  else {
    console.log(req.session);
    res.status(401).send("No autorizado.");
  }
}

exports.OperRegistroMuestra = function(req, res, next){
  console.log(req.session); // ****
  res.render('registroMuestra');
}

exports.generarCodigo = function(req, res, next){
    var str = req.body.t;

    if(str){
      //var code = qr.image(new Date().toString(), { type: 'svg' });
      var code = qr.image(str, { type: 'pdf' });
      res.type('pdf');
      code.pipe(res);
    }
    else{
      res.send("Error. No hay informacion para generar el codigo");
    }
}

exports.OperRegistroPaciente = function(req, res, next){
  res.render('registroPaciente');
}

exports.OperEstadisticas = function(req, res, next){
  res.render('estadisticas');
}