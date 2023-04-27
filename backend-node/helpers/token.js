'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "MiContraseñaSecreta";

function obtenerTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    };
    return jwt.encode(payload, secret);
}

function validarTokenUsuario(req, resp, nextStep){
    try{
        var tokenEnviadoPorUsuario = req.headers.authorization;
        var tokenLimpio = tokenEnviadoPorUsuario.replace("Bearer ",  "");
        var payload = jwt.decode(tokenLimpio, secret);
        req.header.userId = payload.sub; // Recordar en la sesion quien esta logueado
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message:"Token Invalido"});
    }
}

module.exports={
    obtenerTokenUsuario,
    validarTokenUsuario
}
