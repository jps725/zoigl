"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const { breweryNames } = require("../../randomSeeder/randomBeer");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let seededUsers = [
      {
        email: "demo@brewery.com",
        username: "Demo",
        hashedPassword: bcrypt.hashSync("password"),
        breweryName: "Demo Brewery",
        profileImageUrl:
          "https://zoiglawsbucket.s3.amazonaws.com/default-profile-picture.png",
      },
    ];

    const randomUsers = 25;

    const randomNumber = (max) => {
      return Math.floor(Math.random() * max);
    };

    for (let i = 1; i < randomUsers; i++) {
      let randomUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(`whatsOnTap${randomNumber(i)}`),
        breweryName: breweryNames[Math.floor(Math.random() * 5)],
        profileImageUrl: faker.internet.avatar(),
      };
      seededUsers.push(randomUser);
    }

    return queryInterface.bulkInsert("Users", seededUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", null, {});
  },
};
