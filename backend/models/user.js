// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require ('../config/sequelize.js');
const { verifyEmail } = require('../controllers/users.controller.js');

const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    verifiedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: /^[\d+\-()\s]{10}$/i },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professionalField: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    oversea: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: { isIn: [['yes', 'no', 'unspecified']] },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
{
  tableName: "users",
});

module.exports = User;
