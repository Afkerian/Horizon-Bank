'use strict'
var Cliente=require('../models/cliente');
var fs=require('fs');
const path = require('path');const usuario = require('../models/usuario');
;
var controller={
   inicio:function(req, res){
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );

   },
   getClientes:function(req, res){
        Cliente.find({}).sort().exec((err, clientes)=>{
            if(err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!clientes) return  res.status(404).send({message:'No hay clientes para mostrar'});
            return res.status(200).send({clientes});
        })
    },

    saveCliente:function(req, res){
        //Aqui capturo los datos
        var cliente=new Cliente();
        var params =req.body;
        cliente.nombre=params.nombre;
        cliente.apellido=params.apellido;
        cliente.cedula=params.cedula;
        cliente.correo=params.correo;

    //Aqui voy a guardar los datos
        cliente.save((err, clienteGuardado) =>{
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!clienteGuardado) return  res.status(404).send({message:'NO se ha guardado el cliente'});
            return res.status(200).send({cliente:clienteGuardado});
        })
    },

    getCliente:function(req,res){
        var clienteId=req.params.id;
        if(clienteId==null) return res.status(404).send({message:'El el cliente no existe'});
        
        Cliente.findById(clienteId,(err,cliente)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!cliente) return res.status(404).send({message:'El clinete no existe'});
            return res.status(200).send({cliente});
        })

    },
    deleteCliente:function(req,res){
        var ClienteId=req.params.id;
                
        Cliente.findByIdAndRemove(ClienteId,(err,clienteBorrado)=>{
            if (err) return res.status(500).send({message:'Error al borrar los datos'});
            if(!clienteBorrado) return res.status(404).send({message:'No se puede eliminar el cliente'});
            return res.status(200).send({cliente:clienteBorrado});
        })

    },
    updateCliente:function(req,res){
        var clienteId=req.params.id;
        var update=req.body;
                
        Cliente.findByIdAndUpdate(clienteId,update,{new:true},(err,clienteActualizado)=>{
            if (err) return res.status(500).send({message:'Error al actualizar los datos'});
            if(!clienteActualizado) return res.status(404).send({message:'El cliente no existe para actulizar'});
            return res.status(200).send({cliente:clienteActualizado});
        })

    },

    getClienteNombre:function(req,res){
        var nombre=req.params.nombre;
        console.log("nombre: "+nombre);
        if(nombre==null) return res.status(404).send({message:'El nombre del cliente no existe'});
        
        Cliente.find({nombre},(err,cliente)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!cliente) return res.status(404).send({message:'El nombre no existe'});
            return res.status(200).send({cliente});
        })
    },

   /*UsuARIO SAVE*/
saveUsuario:function(req,res){
    var usuario=new Usuario();
    var params=req.body;
    usuario.user=params.user;
    usuario.password=params.password;
    usuario.nombre=params.nombre;
    usuario.apellido=params.apellido;
    usuario.imagen=null;

    usuario.save((err,usuarioGuardado)=>{
        if (err) return res.status(500).send({message:'Error al guardar'});
        if(!usuarioGuardado) return res.status(404).send({message:'No se ha guardado el usuario'});
        return res.status(200).send({usuario:usuarioGuardado});
    })

},

login:function(req,res){
    var user=req.body.user;
    var password=req.body.password;
    var session=req.session;
    console.log(user,password,session);
    if (user==null || password==null) return res.status(404).send({message:'Datos incorrectos'})
   Usuario.findOne({user,password},(err,usuario)=>{
    if (err) return res.status(500).send({message:'Error al recuperar los datos'});
    if(!usuario) return res.status(404).send({message:'Usuario o contraseña incorrectos'});
    if(user==usuario.user && password==usuario.password){
        session.req.session;
        session.user=req.body.user;
        res.send(`Bienvenido ${user} <a href=\'/logout'>Logout</a>`)
    }
   })
},
logout:function(req,res){
    req.session.destroy();
    res.redirect('/inicio');
   
}
}
module.exports=controller;