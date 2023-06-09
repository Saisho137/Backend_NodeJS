'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = "mySecretPassword"

const getUserToken = (user) => {
    const payload = {
        sub: user.id,
        user: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    }
    return jwt.encode(payload, secret)
}

const validateUserToken = (req, resp, nextStep) => {
    try {
        const tokenFromUser = req.headers.authorization;
        const cleanToken = tokenFromUser.replace("Bearer ", "")
        const payload = jwt.decode(cleanToken, secret)
        req.header.userId = payload.sub
        nextStep()
    }
    catch (ex) {
        resp.status(403).send({ message: "Invalid Token" })
    }
}

module.exports = {
    getUserToken,
    validateUserToken
}