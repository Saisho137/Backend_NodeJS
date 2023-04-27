'use strict'

const sequelize = require('sequelize')
const db = new sequelize(
    'segundoparcialsql',
    'root',
    '',
    { dialect: 'mysql', host: 'localhost' }
)

module.exports = db