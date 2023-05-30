'use strict'

const express = require('express')

const greet = (req, res) => {
    const name = req.params.name
    console.log(`Hello ${name}`)
    res.status(200).send({Message: `Hello ${name}!`})
}

const app = express.Router()

app.get('/greetName/:name', greet)

module.exports = app