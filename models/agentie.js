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
    return sequelize.query('SELECT nume, email FROM agentie WHERE id_agentie = :id', {
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

Agentie.ex5b = function () {
    return sequelize.query('SELECT ag1.nume FROM agentie ag1 JOIN oferta of1 ON ag1.id_agentie = of1.id_agentie WHERE ((of1.pret) IN ( SELECT of2.pret FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'EUR\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'EUR\') OR ((of1.pret) IN ( SELECT of2.pret FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'RON\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'RON\') OR ((of1.pret) IN ( SELECT of2.pret FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'USD\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'USD\') OR ((of1.pret) IN ( SELECT of2.pret / 5 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'RON\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'EUR\') OR ((of1.pret) IN ( SELECT of2.pret * 5 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'EUR\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'RON\') OR ((of1.pret) IN ( SELECT (of2.pret / 5) * 107 / 100 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'RON\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'USD\') OR ((of1.pret) IN ( SELECT of2.pret * 100 / 107 * 5 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'USD\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'RON\') OR ((of1.pret) IN ( SELECT of2.pret * 100 / 107 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'USD\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'EUR\') OR ((of1.pret) IN ( SELECT of2.pret * 107 / 100 FROM oferta of2 WHERE of2.id_spatiu = 1 AND of2.id_agentie = 1 AND of2.moneda = \'EUR\' ) AND ag1.id_agentie <> 1 AND of1.moneda = \'USD\');')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

module.exports = Agentie;
