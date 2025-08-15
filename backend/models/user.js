// models/User.js
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

const defineUserModel = (sequelize) => {
  User.init({
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: /^[\d+\-()\s]{7,20}$/i },
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
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });

  return User;
};

module.exports = defineUserModel;
