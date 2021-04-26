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
    const beers = await db.Beer.findAll();

    res.json({ beers });
  })
);

router.post(
  "/",
  beerValidators,
  asyncHandler(async (req, res) => {
    const { name, style, status, ibus, userId, abv } = req.body;
    //userId?
    const newBeer = await db.Beer.build({
      name,
      style,
      status,
      userId,
      abv,
      ibus,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      {
        await newBeer.save();
        res.json({ newBeer });
      }
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      res.json({ errors });
    }
  })
);

module.exports = router;
