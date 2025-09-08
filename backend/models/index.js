const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const models = {};

// Register all models
models.Admin = require('./admin')(sequelize, DataTypes);
models.User = require('./user')(sequelize, DataTypes);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;