/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// var Events = require('/modules/Events.js');
// var Users = require('/modules/user.js');

module.exports = (sequelize, DataTypes) => {
  var Regs = sequelize.define("Regs", {
    regID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },

    eventID: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: "Events",
      //   referencesKey: "id",
      // },
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },

    userID: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: "Users",
      //   referencesKey: "id",
      // },
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  });
  return Regs;
};
