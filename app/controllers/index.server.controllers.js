var Paciente = require('./paciente.server.controllers');
var Operario = require('./operario.server.controllers');
var Laboratorista = require('./laboratorista.server.controllers');

exports.identificar = function(req, res, next){
    if(req.body.rol == "operario"){
        Operario.operarioByCedulaContraseña(req, res, next);
    }
			/*   ESTE CODIGO GENERA ERROR AL MOMENTO DE FALLAR EL LOGIN COMO OPERARIO
				if (res.url!='/') {
				   req.session["rol"] = "operario";
				} else {
				   res.sendStatus(401);
				}
			*/
  //================================================================
    if(req.body.rol == "paciente"){
        Paciente.pacienteByCedulaContraseña(req, res, next);
    }
  //================================================================
    if(req.body.rol ==  "laboratorista"){
        Laboratorista.laboratoristaByCedulaContraseña(req, res, next);
    }
}

exports.crear = function(req, res, next){
    if (req.body.rol == "paciente") { Paciente.crear(req, res, next); }
    if (req.body.rol == "operario") { Operario.crear(req, res, next); }
    if (req.body.rol == "laboratorista") { Laboratorista.crear(req, res, next); }
}

exports.pagInicial = function(req, res, next){
    if(!req.session.rol){
      res.render('index');
    } else {
      res.render(req.session.rol);
    }
}


// Esto no deberia ir aqui :v
exports.pagPaciente = function(req, res, next){
    res.render('paciente');
}
