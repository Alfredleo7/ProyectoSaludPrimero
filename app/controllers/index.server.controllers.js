var Paciente = require('./paciente.server.controllers');

exports.identificar = function(req, res, next){
  if(req.body.rol ==  "paciente"){
    Paciente.pacienteByCedulaContraseña(req, res, next);
  }
}

exports.crear = function(req, res, next){
  Paciente.crear(req, res, next);
}

exports.pagInicial = function(req, res, next){
  res.render('index');
}

exports.pagOperario = function(req, res, next){
  res.render('operario');
}

exports.pagPaciente = function(req, res, next){
  res.render('paciente');
}

exports.pagLaboratorista = function(req, res, next){
  res.render('laboratorista');
}