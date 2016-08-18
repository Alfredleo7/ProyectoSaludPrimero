var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pacienteSchema = new Schema({
  nombres : String,
  apellidos : String,
  cedula : String,
  email : String,
  direccion : String,
  telefono : Object,
  password : String,
  fichas : Object
});

mongoose.model('Paciente', pacienteSchema);
