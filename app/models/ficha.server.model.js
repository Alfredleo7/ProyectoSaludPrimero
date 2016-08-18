var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fichaSchema = new Schema({
  tipoMuestra : String,
  fecha: String,
  proceso: String,
  link: String,
  estado: String,
  codigoBarras: String,
  id_paciente : String,
  id_laboratorio : String,
  id_centroMedico : String,
  examenes : Object
});

mongoose.model('Ficha', fichaSchema);
