const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Exceptii = sequelize.define('exceptii', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_agentie: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_spatiu: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    vanzare: {
        type: Sequelize.CHAR(1),
        allowNull: false,
    },
    pret: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    moneda: {
        type: Sequelize.STRING(3),
        allowNull: false,
    },
    natura_exceptiei: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'exceptii',
    timestamps: false
});

Exceptii.ex8 = function() {
    return sequelize.query('CALL InserareExceptii();')
}

module.exports = Exceptii;