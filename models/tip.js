const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Tip = sequelize.define('tip', {
    id_tip: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    denumire: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    caracteristici: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'tip',
    timestamps: false
});

module.exports = Tip;
