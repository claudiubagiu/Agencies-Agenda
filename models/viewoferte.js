const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const ViewOferte = sequelize.define('viewoferte', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_agentie: {
      type: Sequelize.INTEGER
    },
    nume: {
      type: Sequelize.STRING(255),
    },
    email: {
      type: Sequelize.STRING(255),
    },
    id_spatiu: {
      type: Sequelize.INTEGER,
    },
    id_tip: {
      type: Sequelize.INTEGER,
    },
    denumire: {
      type: Sequelize.STRING(255),
    },
    caracteristici: {
      type: Sequelize.TEXT,
    },
    adresa: {
      type: Sequelize.STRING(255),
    },
    zona: {
      type: Sequelize.INTEGER,
    },
    suprafata: {
      type: Sequelize.INTEGER,
    },
    pret: {
      type: Sequelize.DECIMAL(10, 2),
    },
    vanzare: {
      type: Sequelize.CHAR(1),
    },
    moneda: {
      type: Sequelize.STRING(3),
    },
  }, {
    tableName: 'viewoferte', 
    timestamps: false,
    freezeTableName: true,
  });

  
  module.exports = ViewOferte;