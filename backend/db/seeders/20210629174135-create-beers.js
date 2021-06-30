"use strict";
const fetch = require("node-fetch");
const { beerFunc } = require("../../randomSeeder/beers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let beers = [];
    for (let i = 0; i < 50; i++) {
      const beer = await beerFunc();
      beers.push(beer);
    }

    return queryInterface.bulkInsert("Beers", beers, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Beers", null, {});
  },
};
