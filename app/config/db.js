
const Sequelize = require('sequelize');
const connection = new Sequelize("test", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
});

connection.authenticate().then((err) => {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});

connection.sync({ force: false }).then((result) => {
    if (result) {
        console.log('Model is created and re sync');
    } else {
        console.log('problem in define the model');
    }
});

module.exports = connection;
