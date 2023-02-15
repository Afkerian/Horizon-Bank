const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' });


//When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
// https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to

// Right now, this option is enabled by default, but it will be changed in Mongoose v7 to false by default. That means that all the fields will be saved in the database, even if some of them are not specified in the Schema model.

// So, if you want to have strict Schemas and store in the database only what is specified in you model, starting with Mongoose v7, you will have to set strict option to true manually.
mongoose.set('strictQuery', true);

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log('DB Conectada');
        
    } catch (error) {
        console.log(error);
        process.exit(1); // Detenemos la app
    }
}

module.exports = conectarDB