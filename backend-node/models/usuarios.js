'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String
});

module.exports = mongoose.model('usuarios', UsuariosSchema);
