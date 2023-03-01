'use strict'
var mongoose =require('mongoose');
var port ='3600';
mongoose.promise=global.Promise;
mongoose.set("strictQuery", false);
var app=require('./app');
mongoose.connect('mongodb+srv://isaacmateosv:mongodv@testmongo.1uoiaiv.mongodb.net/test')

.then(()=>{
    console.log("Conexion establecida cona la bbd");
   app.listen(port,()=>{
       console.log("Conexion establecida en el url: localhost:3600");
       
   })
})
.catch(err=>console.log(err))


