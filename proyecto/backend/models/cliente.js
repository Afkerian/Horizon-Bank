'use strict'
var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var clienteSchema=Schema( {
    nombre: String,
    apellido: String,
    cedula: String,
    correo: String
});

module.exports=mongoose.model('Cliente',clienteSchema);