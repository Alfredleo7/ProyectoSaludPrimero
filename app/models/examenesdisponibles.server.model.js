var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examenDSchema = new Schema({
  tipo : String,
  nombreExamen : String
});

mongoose.model('Examenesdisponibles', examenDSchema);