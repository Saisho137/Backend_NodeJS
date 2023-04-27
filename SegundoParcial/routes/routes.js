'use strict'

const token = require('../models/token')
const usersController = require('../controllers/usersController')
const articlesController = require('../controllers/articlesController')

const express = require('express')
const app = express.Router()

//Users Controller
app.get('/test', token.validateUserToken, usersController.test)
app.post('/signUp', usersController.signUpUser)
app.post('/signIn', usersController.signInUser)

//Articles Controller
app.post('/postArticles', token.validateUserToken, articlesController.addArticle)
app.get('/getArticles', token.validateUserToken, articlesController.getArticles)

//
module.exports = app