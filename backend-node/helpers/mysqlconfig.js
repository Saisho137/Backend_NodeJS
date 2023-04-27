'use strict'

var sequelize = require("sequelize")

var db = new sequelize(
    "programacionweb",
    "root",
    "",
    {
        dialect: "mysql",
        host: "localhost"
    }
)

module.exports = db;
