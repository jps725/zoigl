"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@brewery.com",
          username: "Just Tasting",
          hashedPassword: bcrypt.hashSync("password"),
          breweryName: "Tastery",
          profileImageUrl:
            "https://zoiglawsbucket.s3.amazonaws.com/default-profile-picture.png",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          breweryName: "Fakery1",
          profileImageUrl:
            "https://zoiglawsbucket.s3.amazonaws.com/default-profile-picture.png",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          breweryName: "Fakery2",
          profileImageUrl:
            "https://zoiglawsbucket.s3.amazonaws.com/default-profile-picture.png",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Just Tasting", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
