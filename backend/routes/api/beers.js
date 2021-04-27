const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");

const beerValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a beer name")
    .isLength({ max: 50 })
    .withMessage("Beer name must be no more than 50 characters"),
  check("style")
    .exists({ checkFalsy: true })
    .withMessage("Please select a style"),
  handleValidationErrors,
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const beers = await db.Beer.findAll();

    res.json({ beers });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const beer = await db.Beer.findByPk(req.params.id);
    return res.json({ beer });
  })
);

router.post(
  "/",
  beerValidators,
  asyncHandler(async (req, res) => {
    const { name, style, status, ibus, userId, abv } = req.body;
    const beer = await db.Beer.build({
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
        await beer.save();

        return res.json({ beer });
      }
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      return res.json({ errors });
    }
  })
);

const update = async (details) => {
  const id = details.id;
  delete details.id;
  await db.Beer.update(details, { where: { id } });
  return id;
};

router.put(
  "/:id",
  beerValidators,
  asyncHandler(async (req, res) => {
    const id = await update(req.body);
    const beer = await db.Beer.findByPk(id);
    return res.json(beer);
  })
);

module.exports = router;
