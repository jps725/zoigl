const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Image } = require("../../db/models");

const singlePublicFileUpload = require("../../awsS3");
const singleMulterUpload = require("../../awsS3");
const db = require("../../db/models");

const router = express.Router();

const imageValidators = [
  check("imageUrl")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an image url"),
  handleValidationErrors,
];

router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const profileImage = await db.Image.findByPk(userId);
    res.json({ profileImage });
  })
);

router.get(
  "/beer/:beerId",
  asyncHandler(async (req, res) => {
    const beerId = req.body.beerId;
    const beerImage = await db.Image.findByPk(beerId);
    res.json({ beerImage });
  })
);

router.post(
  "/",
  imageValidators,
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { imageType, imageUrl, userId, beerId } = req.body;
    const imageUrl = await singlePublicFileUpload(req.file);
    const image = await Image.build({
      imageType,
      imageUrl,
      beerId,
      userId,
    });

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await image.save();
      res.json({ image });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.json({ errors });
    }
  })
);

const remove = async (id) => {
  const image = await db.Review.findByPk(id);
  if (!image) throw new Error("Can't find that review");

  await db.Image.destroy({ where: { id: image.id } });
  return image.id;
};

router.delete(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = await remove(req.params.id);
    return res.json({ userId });
  })
);

router.delete(
  "/beer/:beerId",
  asyncHandler(async (req, res) => {
    const beerId = await remove(req.params.id);
    return res.json({ beerId });
  })
);

module.exports = router;
