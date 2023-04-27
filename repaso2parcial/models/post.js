'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = Schema({
    user: String,
    title: String,
    theme: String,
    description: String
})

module.exports = mongoose.model('posts', PostSchema)