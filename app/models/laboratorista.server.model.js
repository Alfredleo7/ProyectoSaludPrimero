var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laboratoristaSchema = new Schema({
  nombres : String,
  apellidos : String,
  cedula : String,
  email : String,
  direccion : String,
  telefono : Object,
  password : String,
  fichas : Object
});

mongoose.model('Laboratorista', laboratoristaSchema);