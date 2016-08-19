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

exports.pagOperario = function(req, res, next){
  // ***
  res.render('operario');
}

exports.OperRegistroMuestra = function(req, res, next){
  res.render('registroMuestra');
}

exports.OperRegistroPaciente = function(req, res, next){
  res.render('registroPaciente');
}

exports.OperEstadisticas = function(req, res, next){
  res.render('estadisticas');
}

exports.pagPaciente = function(req, res, next){
  res.render('paciente');
}

exports.pagLaboratorista = function(req, res, next){
  res.render('laboratorista');
}