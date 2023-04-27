'use strict'

const userController = require('../controllers/userController')
const token = require('../models/token')
const postController = require('../controllers/postController')
const scoreController = require('../controllers/scoreController')

const express = require('express') 
const app = express.Router()

//Register user controller
app.post('/registerUser', userController.registerUser)
app.post('/signIn', userController.signIn)

//Post publisher controller
app.post('/post', token.validateUserToken, postController.addPost)

//Score rating controller
app.post('/score', token.validateUserToken, scoreController.addScore)


module.exports = app