const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Image } = require("../../db/models");

const singlePublicFileUpload = require("../../awsS3");
const singleMulterUpload = require("../../awsS3");

const router = express.Router();

const imageValidators = [
  check("imageUrl")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an image url"),
];

router.post(
  "/images",
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
