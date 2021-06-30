"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      breweryName: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 100],
        },
      },
      profileImageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Image, { foreignKey: "userId" });
    User.hasMany(models.Review, { foreignKey: "userId" });
    User.hasMany(models.Beer, { foreignKey: "userId" });
    User.hasMany(models.Event, { foreignKey: "userId" });
  };

  User.prototype.toSafeObject = function () {
    const { id, username, email, breweryName, profileImageUrl } = this;
    return { id, username, email, breweryName, profileImageUrl };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({
    username,
    email,
    password,
    breweryName,
    profileImageUrl,
  }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      breweryName,
      profileImageUrl,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  return User;
};
