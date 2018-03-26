const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'proj2048',
    username: 'root',
    password: 'root',
    host: 'localhost'
});

module.exports = sequelize;
