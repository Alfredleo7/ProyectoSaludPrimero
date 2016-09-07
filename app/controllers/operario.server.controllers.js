var Operario = require('mongoose').model('Operario');
var qr = require('qr-image');

exports.crear = function(req, res, next){
    var operario = Operario(req.body);
    //operario.password = password();// Al operario no se le genera una clave
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
        }
        else {
            return res.send("se eliminó el operario");
        }
    });
};


// Esta funcion se llama desde el controlador de index para iniciar sesion, no quitar.
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
          req.session["NombresApellidos"] = operario.nombres + ' ' + operario.apellidos;
          res.type("json");
          return res.send({operario : operario, error: "false", url: "/operario"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }

    }
  });
};

// IMPORTANTE !!!!
exports.pagOperario = function(req, res, next){
  var role = req.session["rol"];
  var name = req.session["NombresApellidos"];
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

  if ( role =='operario') {
      res.render('operario', {nombres: name});
  }
  else {
      res.status(401).send("No autorizado. Por favor inicie sesión para continuar");
  }
}

// ==============================================================

exports.OperRegistroMuestra = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('registroMuestra');
    }
    else {
        res.status(401).send("No autorizado. Por favor inicie sesión para continuar");
    }
}

exports.OperAdmMuestra = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('admMuestra');
    }
    else {
        res.status(401).send("No autorizado. Por favor inicie sesión para continuar");
    }
}

exports.OperEliminarMuestra = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('eliminarMuestra');
    }
    else {
        res.render('index');
    }
}

// ==============================================================

exports.OperAdmPaciente = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('registroPaciente');
    }
    else {
        res.render('index');
    }

}

exports.OperEditarPaciente = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('editarPaciente');
    }
    else {
        res.render('index');
    }

}

exports.OperEliminarPaciente = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('eliminarPaciente');
    }
    else {
        res.render('index');
    }

}

// ==============================================================

exports.OperEstadisticas1 = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('estadisticasLabs');
    }
    else {
        res.render('index');
    }
}

exports.OperEstadisticas2 = function(req, res, next){
    var role = req.session["rol"];
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    if ( role =='operario') {
        res.render('estadisticasMensual');
    }
    else {
        res.render('index');
    }
}

exports.generarCodigo = function(req, res, next){
    var str = req.query['for'];
    if(str){
      var code = qr.image(str, { type: 'pdf' });
      res.type('pdf');
      code.pipe(res);
    }
    else{
      res.send('No hay informacion generar el codigo de barras');
    }
}

// ==============================================================
// IMPORTANTE !!!!
exports.salir = function(req, res, next){
  if (req.session) {
    req.session["rol"] = null;
    res.clearCookie('rol');
    req.session.destroy(function() {});
  }
  res.redirect('/');
}

