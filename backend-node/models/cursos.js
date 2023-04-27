'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CursoSchema = Schema({
    nombre: String,
    precio: Number,
    duracionHoras: Number
});

module.exports = mongoose.model('cursos', CursoSchema);
