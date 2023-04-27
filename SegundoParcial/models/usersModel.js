'use strict'

const sequelize = require('sequelize')
const db = require('../helpers/mySqlConection')

const userMysql = db.define(
    'users',
    {
        id:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        rol: { type: sequelize.STRING }
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