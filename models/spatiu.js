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

Spatiu.ex3a = function () {
    return sequelize.query('SELECT * FROM Spatiu WHERE adresa LIKE \'Dej%\' ORDER BY zona ASC, suprafata DESC;')
        .then(([results, metadata]) => {
            return results;
        })
        .catch(err => console.log(err));
}

Spatiu.ex5a = function () {
    return sequelize.query('SELECT * FROM Spatiu WHERE (id_tip, suprafata) IN ( SELECT id_tip, MAX(suprafata) FROM Spatiu WHERE id_tip = (SELECT id_tip FROM Tip WHERE denumire = \'apartament\') GROUP BY id_tip);')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

module.exports = Spatiu;
