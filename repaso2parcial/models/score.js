'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScoreSchema = Schema({
    user: String,
    id: String,
    score: Number
})

module.exports = mongoose.model('scores', ScoreSchema)