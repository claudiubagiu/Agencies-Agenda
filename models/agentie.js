const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Agentie = sequelize.define('agentie', {
    id_agentie: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nume: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'agentie',
    timestamps: false
});

Agentie.getAgentieById = function (id) {
    return sequelize.query('SELECT * FROM agentie WHERE id_agentie = :id', {
            replacements: { id },
            type: Sequelize.QueryTypes.SELECT
        })
        .then(results => {
            return results;
        })
        .catch(error => {
            console.error('Eroare la interogare:', error);
            throw error;
        });
};

Agentie.getAgentieById3 = function () {
    return sequelize.query('SELECT * FROM agentie WHERE id_agentie = 3')
        .then(([results, metadata]) => {
            return results;
        })
        .catch(error => {
            console.error('Eroare la interogare:', error);
            throw error;
        });
};

module.exports = Agentie;
