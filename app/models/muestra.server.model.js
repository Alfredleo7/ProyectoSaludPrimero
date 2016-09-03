var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var muestraSchema = new Schema({
  id_paciente: String,
  nombresPaciente: String,
  apellidosPaciente: String,
  id_centro: String,
  nombreCentro: String,
  id_laboratorio : String,
  nombreLaboratorio : String,
  tipo : String,
  estado : String,
  examenes: [String],
  fecha: {type: Date, default: Date.now }
});

mongoose.model('Muestra', muestraSchema);
