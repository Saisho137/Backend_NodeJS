'use strict'

const sequelize = require('sequelize')
const db = require('../helpers/sqlConection')

const userMysql = db.define(
    'user',
    {

        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        user: { type: sequelize.STRING },
        password: { type: sequelize.STRING }

    },
    {

        initialAutoIncrement: 0,
        freezeTableName: true,
        timestamp: false

    }
)

db.sync().then(() => {
    console.log("Table sincronized")
}).catch((err) => {
    console.log(err)
})

module.exports = userMysql