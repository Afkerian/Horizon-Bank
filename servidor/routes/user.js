//Rutas para usuario
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//api/users
router.post('/', 
//     () => {
//     console.log('Creando producto...');
// }
userController.crearUser
);

router.get('/', userController.obtenerUsers);
router.put('/:id', userController.actualizarUser);

module.exports = router;