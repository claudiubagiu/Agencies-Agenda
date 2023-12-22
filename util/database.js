const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'q1w2e3r4t5y6', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});

module.exports = sequelize;
