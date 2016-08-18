var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operarioSchema = new Schema({
  nombres : String,
  apellidos : String,
  cedula : String,
  email : String,
  direccion : String,
  telefono : Object,
  password : String
});

mongoose.model('Operario', operarioSchema);