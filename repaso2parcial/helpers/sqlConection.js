'use strict'

const sequelize = require('sequelize')
const db = new sequelize(
    'postpractica',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

module.exports = db