'use strict'

var Usuarios = require('../models/usuarios');
var token = require('../helpers/token');
var bcrypt = require('bcryptjs')

function prueba (req, resp){
    resp.status(200).send({message: "El usuario esta logueado"});
}

function registrarUsuario(req, resp){
    var nuevoUsuario = new Usuarios();
    var parametros = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(parametros.password, salt);

    nuevoUsuario.nombre = parametros.nombre;
    nuevoUsuario.apellidos = parametros.apellidos;
    nuevoUsuario.email = parametros.email;
    nuevoUsuario.password = hash;

    nuevoUsuario.save().then(
        (usuarioGuardado) => {
            resp.status(200).send({userCreated: usuarioGuardado});
        },
        err => {
            resp.status(500).send({message: "No se pudo crear el usuario"});
        }
    );
}

function iniciarSesion(req, resp){
    var parametros = req.body;

    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    Usuarios.findOne({email:emailIngresado}).then(
        (usuarioEncontrado) => {
            if(usuarioEncontrado == null){
                resp.status(403).send({message: "No existe usuario"});
            }
            else{
                if(bcrypt.compareSync(passwordIngresado, usuarioEncontrado.password)){
                    resp.status(200).send({message: "Usuario Autenticado Correctamente", token: token.obtenerTokenUsuario(usuarioEncontrado) });
                }
                else{
                    resp.status(403).send({message: "Contraseña Invalida"});
                }
            }
        },
        err => {
            resp.status(500).send({message: "No se pudo consultar el usuario"});
        }
    );
}

module.exports={
    prueba, registrarUsuario, iniciarSesion
}
