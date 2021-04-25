"use strict";
const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
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
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
        },
      },
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: "userId" });
    Image.belongsTo(models.Beer, { foreignKey: "beerId" });
  };
  return Image;
};
