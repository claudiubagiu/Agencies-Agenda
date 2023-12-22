const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Spatiu = sequelize.define('spatiu', {
    id_spatiu: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    adresa: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    zona: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    suprafata: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    id_tip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tip',
            key: 'id_tip',
        },
    }
}, {
    tableName: 'spatiu', 
    timestamps: false
});

module.exports = Spatiu;
