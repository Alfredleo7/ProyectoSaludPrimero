var Paciente = require('./paciente.server.controllers');
var Operario = require('./operario.server.controllers');
var Laboratorista = require('./laboratorista.server.controllers');

exports.identificar = function(req, res, next){
    if(req.body.rol == "operario"){
        Operario.operarioByCedulaContraseña(req, res, next);
        if (res.url!='/') {
            req.session["rol"] = "operario";
        } else {
            res.sendStatus(401);
        }
    }
  //================================================================
    if(req.body.rol == "paciente"){
        Paciente.pacienteByCedulaContraseña(req, res, next);
        if (res.url!='/') {
            req.session["rol"] = "paciente";
        } else {
            res.sendStatus(401);
        }
    }
  //================================================================
    if(req.body.rol ==  "laboratorista"){
        Laboratorista.laboratoristaByCedulaContraseña(req, res, next);
        if (res.url!='/') {
            req.session["rol"] = "laboratorista";
        } else {
            res.sendStatus(401);
        }
    }
}

exports.crear = function(req, res, next){
    if (req.body.rol == "paciente") { Paciente.crear(req, res, next); }
    if (req.body.rol == "operario") { Operario.crear(req, res, next); }
    if (req.body.rol == "laboratorista") { Laboratorista.crear(req, res, next); }
}

exports.pagInicial = function(req, res, next){
    res.render('index');
}


// Esto no deberia ir aqui :v
exports.pagPaciente = function(req, res, next){
    res.render('paciente');
}
// Esto no deberia ir aqui :v
exports.pagLaboratorista = function(req, res, next){
    res.render('laboratorista');
}