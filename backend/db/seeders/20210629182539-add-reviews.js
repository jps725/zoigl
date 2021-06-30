"use strict";
const reviews = require("../../randomSeeder/randomReview");
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
    let randomReviews = [];

    const reviewCount = 100;

    for (let i = 0; i < reviewCount; i++) {
      let randomRating = Math.floor(Math.random() * 5) + 1;

      let idxOne = Math.floor(Math.random() * 5);
      let idxTwo = Math.floor(Math.random() * 5);

      let revPartOne = reviews[randomRating].reviewPartOne[idxOne];
      let revPartTwo = reviews[randomRating].reviewPartTwo[idxTwo];

      let reviewString = revPartOne + " " + revPartTwo;

      let randomUserId = Math.floor(Math.random() * 25) + 1;
      let randomBeerId = Math.floor(Math.random() * 50) + 1;
      let currentReview = {
        userId: randomUserId,
        beerId: randomBeerId,
        review: reviewString,
        rating: randomRating,
      };
      randomReviews.push(currentReview);
    }

    return queryInterface.bulkInsert("Reviews", randomReviews, {});
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
