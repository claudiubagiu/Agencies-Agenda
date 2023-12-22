const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Oferta = sequelize.define('oferta', {
    id_agentie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'agentie', 
            key: 'id_agentie',
        },
    },
    id_spatiu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'spatiu', 
            key: 'id_spatiu',
        },
    },
    vanzare: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['D', 'N']],
        },
    },
    pret: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
    },
    moneda: {
        type: Sequelize.STRING(3),
        allowNull: false,
        validate: {
            isIn: [['RON', 'EUR', 'USD']],
        },
    }
}, {
    tableName: 'oferta',
    timestamps: false
});

module.exports = Oferta;
