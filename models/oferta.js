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

Oferta.ex3b = function () {
    return sequelize.query('SELECT * FROM Oferta WHERE vanzare = \'N\' AND (moneda = \'EUR\' AND pret = 100)  OR (moneda = \'RON\' AND pret = 500) OR (moneda = \'USD\' AND pret = 108);')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

Oferta.ex4a = function () {
    return sequelize.query('SELECT * FROM Oferta NATURAL JOIN Spatiu NATURAL JOIN Tip WHERE Tip.denumire = \'apartament\' AND ((Oferta.pret BETWEEN 25000 AND 40000 AND Oferta.moneda = \'EUR\') OR (Oferta.pret BETWEEN 26963 AND 43151 AND Oferta.moneda = \'USD\') OR (Oferta.pret BETWEEN 125000 AND 200000 AND Oferta.moneda = \'RON\'));')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

Oferta.ex4b = function () {
    return sequelize.query('SELECT DISTINCT A.id_spatiu AS id_spatiu1, B.id_spatiu AS id_spatiu2 FROM Oferta A JOIN Oferta B ON A.id_agentie = B.id_agentie AND A.id_spatiu < B.id_spatiu JOIN Spatiu Sp1 ON A.id_spatiu = Sp1.id_spatiu JOIN Spatiu Sp2 ON B.id_spatiu = Sp2.id_spatiu AND Sp1.id_tip = Sp2.id_tip ORDER BY id_spatiu1 ASC, id_spatiu2 ASC;')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

Oferta.ex6a = function () {
    return sequelize.query('SELECT O.moneda, ROUND(AVG(O.pret), 2) AS pret_mediu FROM Oferta O JOIN Spatiu S ON O.id_spatiu = S.id_spatiu JOIN Tip T ON S.id_tip = T.id_tip WHERE O.vanzare = \'D\' AND T.denumire = \'garaj\' GROUP BY O.moneda;')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

Oferta.ex6b = function () {
    return sequelize.query('SELECT S.zona, MIN(O.pret) AS pret_minim_inchiriere, MAX(O.pret) AS pret_maxim_inchiriere FROM Oferta O JOIN Spatiu S ON O.id_spatiu = S.id_spatiu JOIN Tip T ON S.id_tip = T.id_tip WHERE O.vanzare = \'N\' AND T.denumire = \'apartament\' GROUP BY S.zona;')
        .then(([result, metadata]) => {
            return result;
        })
        .catch(err => console.log(err));
}

module.exports = Oferta;
