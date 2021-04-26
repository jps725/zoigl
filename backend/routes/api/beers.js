const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models");
const { check, validationResult } = require("express-validator");
const beerValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a beer name")
    .isLength({ max: 50 })
    .withMessage("Beer name must be no more than 50 characters"),
  check("style")
    .exists({ checkFalsy: true })
    .withMessage("Please select a style"),
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { user } = req;
    const userBeers = await db.Beer.findAll({ where: { userId: user.id } });
    const recentBeers = await db.Beer.findAll({
      order: ["updatedAt", "DESC"],
      limit: 10,
    });
    res.json({ userBeers, recentBeers });
  })
);
