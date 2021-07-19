const Sequelize = require('sequelize');
const connection = require('../config/db');

const User = connection.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username:{
           type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true,
    }
});
module.exports = User;