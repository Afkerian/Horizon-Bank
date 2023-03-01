'use strict'
var express=require('express');
var router = express.Router();
var clientesController=require('../controllers/cliente.controller');

//Pagina inicio
router.get('/inicio',clientesController.inicio);

//ver todos los clientes
router.get('/clientes',clientesController.getClientes);


//guardar cliente
router.post('/guardar-cliente',clientesController.saveCliente);

//ver datos de un cliente
router.get('/cliente/:id',clientesController.getCliente);
//eliminar un cliente
router.delete('/cliente/:id',clientesController.deleteCliente);
//actulizar un cliente
router.put('/cliente/:id',clientesController.updateCliente);


//buscar por el nombre de un cliente
router.post('/cliente/:nombre',clientesController.getClienteNombre);


/*router.post
router.put
router.delete */
module.exports=router;
