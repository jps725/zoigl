const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const beerValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a beer name")
    .isLength({ max: 50 })
    .withMessage("Beer name must be no more than 50 characters"),
  check("style")
    .exists({ checkFalsy: true })
    .withMessage("Please select a style")
    .isLength({ min: 3 })
    .withMessage("Beer style must be more than 3 characters")
    .isLength({ max: 30 })
    .withMessage("Beer style must be less than 30 characters"),
  check("status")
    .exists({ checkFalsy: true })
    .withMessage("Please select a status"),
  check("abv")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for abv"),
  check("ibus")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for ibus"),
  handleValidationErrors,
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const beers = await db.Beer.findAll({
      include: [
        {
          model: db.User,
          attributes: ["breweryName"],
        },
        // {
        //   model: db.Review,
        //   include: [{ model: db.User }],
        // },
      ],
      order: [["updatedAt", "DESC"]],
      limit: 10,
    });

    res.json({ beers });
  })
);

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const beer = await db.Beer.findByPk(req.params.id);
//     return res.json({ beer });
//   })
// );

router.post(
  "/",
  singleMulterUpload("image"),
  beerValidators,
  asyncHandler(async (req, res) => {
    const { name, style, status, ibus, userId, abv } = req.body;
    let beerImageUrl;
    if (req.file) {
      beerImageUrl = await singlePublicFileUpload(req.file);
    } else {
      beerImageUrl = "https://zoiglawsbucket.s3.amazonaws.com/cheers.jpeg";
    }
    const beer = await db.Beer.build({
      name,
      style,
      status,
      userId,
      abv,
      ibus,
      beerImageUrl,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      {
        await beer.save();

        const newBeer = await db.Beer.findOne({
          where: {
            id: beer.id,
          },
          include: [
            {
              model: db.User,
              attributes: ["breweryName"],
            },
            {
              model: db.Review,
              include: [{ model: db.User }],
            },
          ],
        });
        res.json({ newBeer });
      }
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      return res.json({ errors });
    }
  })
);

router.put(
  "/:id",
  singleMulterUpload("image"),
  beerValidators,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    req.body.id = id;

    let beerImageUrl;
    if (req.file) {
      beerImageUrl = await singlePublicFileUpload(req.file);
    } else {
      beerImageUrl = "https://zoiglawsbucket.s3.amazonaws.com/cheers.jpeg";
    }
    req.body.beerImageUrl = beerImageUrl;

    const beer = await db.Beer.findByPk(id);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.json({ errors });
      return;
    }

    const updatedBeer = await beer.update(req.body);

    const updatedWithInfo = await db.Beer.findOne({
      where: {
        id: updatedBeer.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["breweryName"],
        },
        {
          model: db.Review,
          include: [{ model: db.User }],
        },
      ],
    });
    res.json({ updatedWithInfo });
  })
);

const remove = async (id) => {
  const beer = await db.Beer.findByPk(id);
  if (!beer) throw new Error("Can't find that beer");

  await db.Review.destroy({ where: { beerId: id } });

  await db.Beer.destroy({ where: { id: beer.id } });
  return beer.id;
};

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    const beer = await db.Beer.findOne({
      where: {
        id: beerId,
      },
      include: [
        {
          model: db.User,
          attributes: ["breweryName"],
        },
        {
          model: db.Review,
          include: [{ model: db.User }],
        },
      ],
    });
    res.json({ beer });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const beerId = await remove(req.params.id);
    return res.json({ beerId });
  })
);

module.exports = router;
