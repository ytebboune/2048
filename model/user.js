var sequelize = require('../db.js');
const Sequelize = require('sequelize');
var encrypt = require('../encrypt');

const User = sequelize.define('users', {
        email: Sequelize.STRING,
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', encrypt(val));
            }
        },
        username : Sequelize.STRING,
        rank : Sequelize.INTEGER
    }
    , {
        tableName : 'users',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

User.sync().then(function(){});

module.exports = User;