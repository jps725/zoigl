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
          abv: 8.4,
          ibus: 91,
          beerImageUrl: "https://zoiglawsbucket.s3.amazonaws.com/cheers.jpeg",
        },
        {
          name: "Spring into Saison",
          style: "Saison",
          userId: 1,
          status: "Bottled",
          abv: 6.1,
          ibus: 37,
          beerImageUrl: "https://zoiglawsbucket.s3.amazonaws.com/cheers.jpeg",
        },
        {
          name: "Midnight Moonlight",
          style: "Stout",
          userId: 1,
          status: "Cellared",
          abv: 9.1,
          ibus: 43,
          beerImageUrl: "https://zoiglawsbucket.s3.amazonaws.com/cheers.jpeg",
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
