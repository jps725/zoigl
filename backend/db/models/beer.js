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
          len: [3, 100],
        },
      },
      style: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
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
      abv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: [0],
          max: [30],
        },
      },
      ibus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: [0],
          max: [200],
        },
      },
      beerImageUrl: {
        type: DataTypes.STRING,
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
