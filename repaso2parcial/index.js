'use strict'

const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/practiceWeb')
    .then(
        () => {
            console.log("Succesful connection with DB.")
            app.listen(8698, function () {
                console.log("Server has been Initilized.")
            })
        })
    .catch((err) => {
        console.log("Failed to connect to DB.")
        console.log(err)
    })