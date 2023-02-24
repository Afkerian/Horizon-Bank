const mongoose = require('mongoose');

const CuentaSchema = mongoose.Schema({
    id_cuenta: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
        require: true
    },
    saldo: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});
// const UsuarioSchema = mongoose.Schema({
//     nombres: {
//         type: String,
//         require: true
//     },
//     apellidos: {
//         type: String,
//         require: true
//     },
//     cedula: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     fechaCreacion: {
//         type: Date,
//         default: Date.now()
//     }
// });

module.exports = mongoose.model('Cuenta', CuentaSchema);
// module.exports = mongoose.model('Usuario', UsuarioSchema);