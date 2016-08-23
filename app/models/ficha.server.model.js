var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fichaSchema = new Schema({
  //tipoMuestra : String,
  fecha: {type: Date, default: Date.now},
  //proceso: String,
  //link: String,
  //estado: String,
  codigoBarras: String,
  id_paciente : String,
  //id_laboratorio : String,
  //nombreLaboratorio: String,
  id_centroMedico : String
});

mongoose.model('Ficha', fichaSchema);
