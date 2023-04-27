'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticulosSchema = Schema({
    user: String,
    title: String,
    description: String,
    price: Number
})

module.exports = mongoose.model('articulos', ArticulosSchema)