'use strict'

const token = require("../models/token")
const userSql = require("../models/usersModel")
const Op = require("sequelize").Op;
const bcrypt = require("bcryptjs")

const test = (req, resp) => {
    resp.status(200).send({ message: "User is Logged in" });
}

const signUpUser = (req, res) => {
    const newUser = {}
    const params = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(params.password, salt)

    newUser.id = params.id
    newUser.user = params.user
    newUser.password = hash
    newUser.rol = params.rol

    userSql.create(newUser)
        .then(
            data => { res.status(200).send(data) }
        )
        .catch(
            err => { res.status(500).send(err) }
        )
}

const signInUser = (req, res) => {
    const params = req.body

    const sentUser = params.user
    const sentPassword = params.password

    userSql.findOne({
        where: {
            user: { [Op.substring]: sentUser }
        }
    }).then(
        foundUser => {
            if (foundUser === null) {
                res.status(403).send({ message: "User doesnt exist." })
            } else {
                if (bcrypt.compareSync(sentPassword, foundUser.dataValues.password)) {
                    res.status(200).send({ message: "User Authenticated.", token: token.getUserToken(foundUser) })
                } else {
                    res.status(403).send({ message: "Invalid Password." })
                }
            }
        }
    ).catch(
        err => { res.status(500).send(err) }
    )
}

module.exports = {
    test, signUpUser, signInUser
}