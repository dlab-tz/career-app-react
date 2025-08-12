const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('career_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
