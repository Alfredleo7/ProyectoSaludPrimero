var mongoose = require('mongoose');
var Schema2 = mongoose.Schema;

var coordSchema = new Schema2({
	Latitud: String,
	Longitud: String
});

mongoose.model('Coordenadas', coordSchema);