require('dotenv').config();
const Sequelize = require('sequelize');
const UserModel = require('./user');

const DB = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        protocol: 'tcp',
        dialectOptions: {
            encrypt: true,
        }
    }
);

const User = UserModel(DB, Sequelize);

// promesa, funciones asincronas
DB.authenticate()
    .then(() => {
        console.log('Conection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

// DB.sync({ force: true }) para hacer drop de las tablas antes del sync
DB.sync().then(() => {
    console.log(`Database & tables created!`)
}).catch(err => console.error(err))

module.exports = {
    User, 
    // los demás modelos que quiero exportar
}