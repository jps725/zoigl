"use strict";
const { beerStyles, status, images } = require("../../randomSeeder/randomBeer");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */

    let seededBeers = [];

    const newBeerCount = 100;

    for (let i = 0; i < newBeerCount; i++) {
      let randomBeer = {
        name: faker.random.words(),
        style: beerStyles[Math.floor(Math.random() * 78)],
        userId: Math.floor(Math.random() * 100),
        status: status[Math.floor(Math.random() * 4)],
        abv: Math.floor(Math.random() * (150 - 15) + 10) / 10,
        ibus: Math.floor(Math.random() * 150),
        beerImageUrl: images[Math.floor(Math.random() * 9)],
      };
      seededBeers.push(randomBeer);
    }

    return queryInterface.bulkInsert("Beers", seededBeers, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete("Beers", null, {});
  },
};
