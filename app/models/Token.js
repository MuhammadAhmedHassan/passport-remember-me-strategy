const Sequelize = require('sequelize');
const connection = require('../config/db');
const Token = connection.define('tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,

    }
})
module.exports = Token;