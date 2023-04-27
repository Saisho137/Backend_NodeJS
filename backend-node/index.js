'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://127.0.0.1:27017/progweb').then( 
    () => {
        console.log("Conexion con BBDD exitosa");
        application.listen(8698, function(){
            console.log("El servidor web se ha iniciado correctamente");
        });
    },
    err => {
        console.log("Conexion con BBDD fallida");
    }
);
