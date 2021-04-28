const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const reviewValidators = [
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a rating"),
  check("review").isLength({ max: 256 }),
  handleValidationErrors,
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const beerId = req.body.beerId;
    const reviews = await db.Review.findAll({ where: { beerId } });
    res.json({ reviews });
  })
);

router.post(
  "/",
  reviewValidators,
  asyncHandler(async (req, res) => {
    const { rating, review, userId, beerId } = req.body;
    const review = await db.Review.build({
      rating,
      review,
      userId,
      beerId,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      {
        await review.save();
        return res.json({ review });
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
  await db.Reviews.update(details, { where: { id } });
  return id;
};

router.put(
  "/:id",
  reviewValidators,
  asyncHandler(async (req, res) => {
    const id = await update(req.body);
    const review = await db.Review.findByPk(id);
    return res.json(review);
  })
);

const remove = async (id) => {
  const review = await db.Review.findByPk(id);
  if (!review) throw new Error("Can't find that review");

  await db.Review.destroy({ where: { id: review.id } });
  return review.id;
};

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const reviewId = await remove(req.params.id);
    return res.json({ reviewId });
  })
);

module.exports = router;
