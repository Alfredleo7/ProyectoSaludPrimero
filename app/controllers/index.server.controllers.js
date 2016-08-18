var Paciente = require('./paciente.server.controllers');
var Operario = require('./operario.server.controllers');
var Laboratorista = require('./laboratorista.server.controllers');

exports.identificar = function(req, res, next){
  if(req.body.rol ==  "paciente"){
    Paciente.pacienteByCedulaContraseña(req, res, next);
  }

  if(req.body.rol ==  "operario"){
    Operario.operarioByCedulaContraseña(req, res, next);
  }  

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

exports.pagOperario = function(req, res, nombre, next){
  res.render('operario');
}

exports.pagPaciente = function(req, res, nombre, next){
  res.render('paciente');
}

exports.pagLaboratorista = function(req, res, nombre, next){
  res.render('laboratorista');
}