"use strict";
const { Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define(
    "Beer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      style: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
        },
      },
    },
    {}
  );
  Beer.associate = function (models) {
    // associations can be defined here
    Beer.belongsTo(models.User, { foreignKey: "userId" });
    Beer.hasMany(models.Review, { foreignKey: "beerId" });
  };
  return Beer;
};
