const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const { setTokenCookie } = require("../../utils/auth");
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
  singleMulterUpload("image"),
  beerValidators,
  asyncHandler(async (req, res) => {
    const { name, style, status, ibus, userId, abv } = req.body;
    let beerImageUrl;
    if (req.file) {
      beerImageUrl = await singlePublicFileUpload(req.file);
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
  await beer.update(details, { where: { id } });
  return id;
};

router.put(
  "/:id",
  singleMulterUpload("image"),
  beerValidators,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, style, status, ibus, userId, abv } = req.body;
    req.body.id = id;
    console.log("request", req.body);
    let beerImageUrl;
    if (req.file) {
      beerImageUrl = await singlePublicFileUpload(req.file);
    }
    req.body.beerImageUrl = beerImageUrl;
    console.log(beerImageUrl);
    console.log("=======================", id);
    const beer = await db.Beer.findByPk(id);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.json({ errors });
      return;
    }
    const newBeer = await beer.update(req.body);

    res.json(newBeer);

    // if (beer) {
    //   beer.name = name;
    //   beer.style = style;
    //   beer.status = status;
    //   beer.userId = userId;
    //   beer.abv = abv;
    //   beer.ibus = ibus;
    //   beer.beerImageUrl = beerImageUrl;
    //   await beer.save();
    //   res.json({ beer });
    // } else {
    //   const error = new Error(`Beer ${id} not found!`);
    //   error.status = 404;
    //   error.title = "Beer not found";
    //   res.json({ error });
    // }

    // const id = await update(req.body);
    // const beer = await db.Beer.findByPk(id);
    // return res.json(beer);
  })
);

const remove = async (id) => {
  const beer = await db.Beer.findByPk(id);
  if (!beer) throw new Error("Can't find that beer");

  await db.Beer.destroy({ where: { id: beer.id } });
  return beer.id;
};

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const beerId = await remove(req.params.id);
    return res.json({ beerId });
  })
);

module.exports = router;
