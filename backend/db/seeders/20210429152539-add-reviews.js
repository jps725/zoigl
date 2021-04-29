"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          beerId: 4,
          review: "Supper hoppy, effervescent, with a nice piney nose.",
          rating: 4,
        },
        {
          userId: 2,
          beerId: 4,
          review: "One of the best IPAs I've ever had.",
          rating: 5,
        },
        {
          userId: 3,
          beerId: 4,
          review:
            "Pretty good, wish there was more citrus. The bitterness was a little too harsh",
          rating: 3,
        },
        {
          userId: 1,
          beerId: 5,
          review: "I'd have it again.",
          rating: 3,
        },
        {
          userId: 2,
          beerId: 5,
          rating: 3,
        },
        {
          userId: 3,
          beerId: 5,
          review: "Nice black pepper not on the finish.",
          rating: 4,
        },
        {
          userId: 2,
          beerId: 6,
          review: "Great coffee notes, would go great with some chocolate.",
          rating: 4,
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
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
