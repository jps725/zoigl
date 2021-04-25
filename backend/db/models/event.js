"use strict";
const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      eventDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      eventNotes: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 256],
        },
      },
    },
    {}
  );
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Event;
};
