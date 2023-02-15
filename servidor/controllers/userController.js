const User = require("../models/User");

exports.crearUser = async (req, res) => {
    // console.log(req.body);

    try {
        let user;

        //Creamos usuario
        user = new User(req.body);

        await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el POST');
    }
}

exports.obtenerUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el GET');
    }
}

exports.actualizarUser = async (req, res) => {
    try{
        const {nombre, password, cedula } = req.body;
        let user = await User.findById(req.params.id);
        if(!user) {
            res.status(404).json({ msg: 'No existe el user' })
        }

        user.nombre = nombre;
        user.password = password;
        user.cedula = cedula;

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el PUT')
    }
}