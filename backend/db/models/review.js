"use strict";
const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      beerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Beers" },
      },
      review: {
        type: DataTypes.STRING,
      },
      rating: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Beer, {
      foreignKey: "beerId",
    });
  };
  return Review;
};
