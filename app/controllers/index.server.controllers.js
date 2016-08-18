var Paciente = require('./paciente.server.controllers');

exports.identificar = function(req, res, next){

  if(req.body.rol ==  "paciente"){
    Paciente.pacienteByCedulaContraseña(req, res, next);
  }
}

exports.pagInicial = function(req, res, next){
  res.render('index');
}
