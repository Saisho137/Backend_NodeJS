'use strict'

var Cursos = require('../models/cursos');
var CursosMysql = require('../models/cursosmysql');
const Op = require("sequelize").Op;

function crearCurso(req, resp){
    var nuevoCurso = new Cursos();
    var parametros = req.body;

    nuevoCurso.nombre = parametros.nombre;
    nuevoCurso.precio = parametros.precio;
    nuevoCurso.duracionHoras = parametros.duracionHoras;

    nuevoCurso.save().then(
        (cursoGuardado) => {
            resp.status(200).send({cursoCreado: cursoGuardado});
        },
        err => {
            resp.status(500).send({message: "No se pudo crear el curso"});
        }
    );
}

function editarCurso(req, resp){
    var cursoEditar = new Cursos();
    var parametros = req.body;

    cursoEditar._id = req.params._id;   // Parametro que se obtiene desde la URL
    cursoEditar.nombre = parametros.nombre;  //Parametros que se obtienen desde el Body
    cursoEditar.precio = parametros.precio;
    cursoEditar.duracionHoras = parametros.duracionHoras;

    Cursos.findByIdAndUpdate( cursoEditar._id, cursoEditar, {new: true}).then(
        (cursoGuardado) => {
            resp.status(200).send({cursoEditado: cursoGuardado});
        },
        err => {
            resp.status(500).send({message: "No se pudo editar el curso"});
        }
    );
}

function eliminarCurso(req, resp){
    var cursoEliminar = new Cursos();

    cursoEliminar._id = req.params._id;   // Parametro que se obtiene desde la URL

    Cursos.findByIdAndDelete( cursoEliminar._id ).then(
        (cursoEliminado) => {
            resp.status(200).send({cursoEliminado: cursoEliminado});
        },
        err => {
            resp.status(500).send({message: "No se pudo eliminar el curso"});
        }
    );
}

function buscarPorId(req, resp){
    var cursoBuscar = new Cursos();

    cursoBuscar._id = req.params._id;   // Parametro que se obtiene desde la URL

    Cursos.findById( cursoBuscar._id ).then(
        (cursoEncontrado) => {
            resp.status(200).send(cursoEncontrado);
        },
        err => {
            resp.status(500).send({message: "No se pudo encontrar el curso"});
        }
    );
}

function buscarTodos(req, resp){
    Cursos.find( {} ).then(
        (cursosEncontrados) => {
            resp.status(200).send(cursosEncontrados);
        },
        err => {
            resp.status(500).send({message: "No se pudo encontrar cursos"});
        }
    );
}

function buscarPorPrecio(req, resp){
    var precioBuscar =  req.params.precio;   // Parametro que se obtiene desde la URL

    Cursos.find( {precio: {$gte: precioBuscar}} ).then(
        (cursosEncontrados) => {
            resp.status(200).send(cursosEncontrados);
        },
        err => {
            resp.status(500).send({message: "No se pudo encontrar cursos"});
        }
    );
}

///// Operaciones con MYSQL
function crearCursoMysql(req, resp){
    var nuevoCurso = {};
    var parametros = req.body;

    nuevoCurso.nombre = parametros.nombre;
    nuevoCurso.precio = parametros.precio;
    nuevoCurso.duracion_en_horas = parametros.duracionHoras;

    CursosMysql.create(nuevoCurso).then(data => { resp.status(200).send(data); }).catch(err => {resp.status(500).send(err);});
}

function consultarPorIdMysql(req, resp){
    var id = req.params._id;   
    CursosMysql.findByPk(id).then(data => { resp.status(200).send(data); }).catch(err => {resp.status(500).send(err);});
}

function consultarPorNombreMysql(req, resp){
    var nombreBusq = req.params._nombre;   
    CursosMysql.findAll({ where: {
        nombre: { [Op.substring]: nombreBusq }
    }}).then(data => { resp.status(200).send(data); }).catch(err => {resp.status(500).send(err);});
}

function editarCursoMysql(req, resp){
    var cursoEditar = {};
    var parametros = req.body;

    var id = req.params._id;  
    cursoEditar.nombre = parametros.nombre;
    cursoEditar.precio = parametros.precio;
    cursoEditar.duracion_en_horas = parametros.duracionHoras;

    CursosMysql.update(cursoEditar, {where: { id: id}}).then(data => { resp.status(200).send(data); }).catch(err => {resp.status(500).send(err);});
}

function eliminarCursoMysql(req, resp){
    var id = req.params._id;  
    CursosMysql.destroy({where: { id: id}})
        .then((deletedRecord)=>{
            if(deletedRecord == 1){
                resp.status(200).send({"message":"Deleted successfully"});
            } 
            else{
                resp.status(404).send({"message":"Record not found"});
            }
        })
        .catch(err => {
            resp.status(500).send(err);
        });
}

module.exports={
    crearCurso,
    editarCurso,
    eliminarCurso,
    buscarPorId,
    buscarTodos,
    buscarPorPrecio,
    crearCursoMysql,
    consultarPorIdMysql,
    consultarPorNombreMysql,
    editarCursoMysql,
    eliminarCursoMysql
}
