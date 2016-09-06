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
          req.session.idUser = Laboratorista(laboratorista)._id;
          req.session.rol = "laboratorista";
          console.log(req.session);
          res.type("json");
          return res.send({laboratorista : laboratorista, error: "false", url: "/laboratorista"});
        }
        else{
          res.send({mensaje: "Usuario no encontrado. Intente de nuevo", error: "true", url: "/"});
        }

    }
  });
};

exports.laboratoristaByCookie = function(req, res, next){
  var idLaboratorista = req.session.idUser;
  Laboratorista.findById(idLaboratorista, function(err, laboratorista){
    if(err){
      return next(err);
    } else {
      return res.json(laboratorista);
    }
  });
};

exports.pagLaboratorista = function(req, res, next){
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  if ( req.session.rol =='laboratorista') {
    res.render('laboratorista');
  }
  else {
    res.render('index');
  }
}

exports.salir = function(req, res, next){
  if (req.session) {
    req.session["rol"] = null;
    res.clearCookie('rol');
    req.session.destroy(function() {});
  }
  res.redirect('/');
}
