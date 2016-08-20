var Paciente = require('./paciente.server.controllers');
var Operario = require('./operario.server.controllers');
var Laboratorista = require('./laboratorista.server.controllers');

exports.identificar = function(req, res, next){

  if(req.body.rol ==  "paciente"){
    Paciente.pacienteByCedulaContraseña(req, res, next);
//    console.log("Antes del if res-url");
    if (res.url!='/') {
      req.session["rol"] = "operario";
//      console.log("Entro al if res-url");
    } else {
      res.sendStatus(401);
//      res.status(401).send("No autorizado.");
    }

  }
//================================================================
  if(req.body.rol ==  "operario"){
    Operario.operarioByCedulaContraseña(req, res, next);
  }


//================================================================
  if(req.body.rol ==  "laboratorista"){
    Laboratorista.laboratoristaByCedulaContraseña(req, res, next);
  }

  
}

exports.crear = function(req, res, next){
  if (req.body.rol ==  "paciente") {
    Paciente.crear(req, res, next);
  }

  if (req.body.rol ==  "operario") {
    Operario.crear(req, res, next);
  }

  if (req.body.rol ==  "laboratorista") {
    Laboratorista.crear(req, res, next);
  }
}

exports.pagInicial = function(req, res, next){
  res.render('index');
}

exports.pagPaciente = function(req, res, next){
  res.render('paciente');
}

exports.pagLaboratorista = function(req, res, next){
  res.render('laboratorista');
}