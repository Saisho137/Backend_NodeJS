'use strict'

var express = require('express');
var authcontroller = require('../controllers/authentication');
var cursocontroller = require('../controllers/cursos');
var token = require('../helpers/token');

var application = express.Router();

application.post('/usuario/create', authcontroller.registrarUsuario);
application.post('/usuario/login', authcontroller.iniciarSesion);
application.get('/prueba', token.validarTokenUsuario, authcontroller.prueba);

application.post('/curso/create', token.validarTokenUsuario, cursocontroller.crearCurso);
application.put('/curso/edit/:_id', token.validarTokenUsuario, cursocontroller.editarCurso);
application.delete('/curso/delete/:_id', token.validarTokenUsuario, cursocontroller.eliminarCurso);
application.get('/curso/findById/:_id', token.validarTokenUsuario, cursocontroller.buscarPorId);
application.get('/curso/findAll', token.validarTokenUsuario, cursocontroller.buscarTodos);
application.get('/curso/findByPrice/:precio', token.validarTokenUsuario, cursocontroller.buscarPorPrecio);

application.post('/cursomysql/create', cursocontroller.crearCursoMysql);
application.get('/cursomysql/findById/:_id', cursocontroller.consultarPorIdMysql);
application.get('/cursomysql/findByName/:_nombre', cursocontroller.consultarPorNombreMysql);
application.put('/cursomysql/edit/:_id', cursocontroller.editarCursoMysql);
application.delete('/cursomysql/delete/:_id', cursocontroller.eliminarCursoMysql);

application.get('/health-check', function(req, resp){
    resp.status(200).send({mensaje:"Ok"});
});

module.exports = application;
