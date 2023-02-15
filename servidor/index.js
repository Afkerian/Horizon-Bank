// console.log('desde index.js')

const express = require('express');
const conectarDB = require('./config/db');

//Creación server
const app = express();

//Conectamos a la BD
conectarDB();

app.use(express.json());

app.use('/api/usuarios', require('./routes/user'));

//Ruta principal
// app.get('/', (req,res) => {
//     res.send('Hola mundo');
// })

app.listen(4000, ()=>{
    console.log('El server está corriendo nicely');
})