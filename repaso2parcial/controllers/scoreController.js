'use strict'

const mongoose = require('mongoose')
const Score = require("../models/score")
const jwt = require('jwt-simple')

const addScore = (req, res) => {
    const params = req.body
    const newScore = new Score()

    try {
        const decoded = jwt.decode(req.headers.authorization.replace("Bearer ", ""), "mySecretPassword")

        newScore.user = decoded.user
        newScore.id = params.id
        newScore.score = params.score

        newScore.save().then(
            (savedScore) => {
                res.status(200).send({ scoreCreated: savedScore })
            },
            err => {
                res.status(500).send({ message: "Could not add the rating info." })
            }
        )
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Token missing or invalid.' })
    }
}

module.exports = {
    addScore
}