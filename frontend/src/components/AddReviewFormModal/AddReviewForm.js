import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as beerActions from "../../store/beers";

const AddReviewForm = ({ onClose, beer }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const beerId = beer.id;

  const updateRating = (e) => setRating(e.target.value);
  const updateReview = (e) => setReview(e.target.value);

  const reset = () => {
    setRating(0);
    setReview("");
    setErrors({});
  };

  useEffect(() => {
    let errors = {};
    if (!rating) {
      errors.rating = "Please provide a rating.";
    }
    if (review.length > 256) {
      errors.review = "Review must be less than 256 characters.";
    }
    setErrors(errors);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addReview = { rating, review, userId, beerId };

    dispatch(reviewActions.createReview(addReview));
    dispatch(beerActions.getOneBeer(beerId));
    // .catch(async (res) => {
    //   await res.json();
    // });
    reset();
    onClose();
  };

  return (
    <div className="form__div">
      <h1>Add New Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="number"
            placeholder="Rating"
            required
            value={rating}
            onChange={updateRating}
          />
        </label>
        {errors.rating && <div className="errors">{errors.rating}</div>}
        <label>
          <textarea
            placeholder="Review"
            value={review}
            onChange={updateReview}
          />
        </label>
        {errors.review && <div className="errors">{errors.review}</div>}
        <button type="submit" disabled={Object.keys(errors).length}>
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
