var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;

console.log('Servidor ejecutandose');
