module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING
    },
    dateOfBirth: {
      type: DataTypes.DATE
    },
    locationType: {
      type: DataTypes.STRING
    },
    educationLevel: {
      type: DataTypes.STRING
    },
    professionalField: {
      type: DataTypes.STRING
    }
  });

  return User;
};
