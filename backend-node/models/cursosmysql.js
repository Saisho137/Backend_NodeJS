var sequelize = require("sequelize")
var db = require("../helpers/mysqlconfig");

var cursoMysql = db.define(
    "curso",
    {
        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        duracion_en_horas: { type: sequelize.INTEGER },
        nombre: { type: sequelize.STRING },
        precio: { type: sequelize.INTEGER }
    },
    {
        initialAutoIncrement: 25,
        freezeTableName: true,
        timestamps: false
    }
);

db.sync().then(() => {
    console.log('Table sincronized successfully');
}).catch((error) => {
    console.error('Unable to sincronized table : ', error);
});

module.exports = cursoMysql;
