const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../awsS3.js");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters"),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("breweryName")
    .isLength({ min: 5 })
    .withMessage("Brewery Name must be more than 5 characters"),
  handleValidationErrors,
];

router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, breweryName } = req.body;
    let profileImageUrl;
    if (req.file) {
      profileImageUrl = await singlePublicFileUpload(req.file);
    } else {
      profileImageUrl =
        "https://zoiglawsbucket.s3.amazonaws.com/default-profile-picture.png";
    }

    const user = await User.signup({
      username,
      email,
      password,
      profileImageUrl,
      breweryName,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
