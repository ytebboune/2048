const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    database: '2048',
    username: 'root',
    password: '',
    host: 'localhost'
});

module.exports = sequelize;