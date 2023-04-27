'use strict'

const token = require("../models/token")
const userSql =  require("../models/userSql")
const Op = require("sequelize").Op;
const bcrypt = require("bcryptjs")

const registerUser = (req, res) => {
    const newUser = {}
    const params = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(params.password, salt)

    newUser.id = params.id
    newUser.user = params.user
    newUser.password = hash

    userSql.create(newUser)
    .then(data => { res.status(200).send(data)})
    .catch(err => {res.status(500).send(err)})
}

const signIn = (req, res) => {
    const params = req.body

    const searchUser = params.user
    userSql.findOne({ where: {
        user: { [Op.substring]: searchUser }
    }})
    .then(data => { res.status(200).send({message: "User Authenticated.", token: token.getUserToken(data)})})  //Enviar el token
    .catch(err => {res.status(500).send(err)})
    
}

module.exports = {
    registerUser,
    signIn
}