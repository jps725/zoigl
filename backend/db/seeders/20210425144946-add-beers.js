"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkInsert(
      "Beers",
      [
        {
          name: "Flying Eagle IPA",
          style: "IPA",
          userId: 1,
          status: "On Tap",
        },
        {
          name: "Spring into Saison",
          style: "Saison",
          userId: 1,
          status: "Bottled",
        },
        {
          name: "Midnight Moonlight",
          style: "Stout",
          userId: 1,
          status: "Cellared",
        },
      ],
      {}
    );
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
