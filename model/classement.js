var sequelize = require('../db.js');
const Sequelize = require('sequelize');
var encrypt = require('../encrypt');

const Classement = sequelize.define('classement', {
        username : Sequelize.STRING,
        recordDuree : Sequelize.STRING,
        recordCoups : Sequelize.INTEGER,
    }
    , {
        tableName : 'classement',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

Classement.sync().then(function(){});

module.exports = Classement;