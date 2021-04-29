import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import "./EditReviewForm.css";

const EditReviewForm = ({ onClose, review }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [rating, setRating] = useState(review.rating);
  const beerId = review.beerId;
  const id = review.id;
  const [editReview, setReview] = useState(review.review);
  const [errors, setErrors] = useState([]);

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
    const updatedReview = { rating, editReview, userId, beerId, id };
    dispatch(reviewActions.updateReview(updatedReview)).catch(async (res) => {
      await res.json();
    });
    reset();
    onClose();
  };

  return (
    <div className="form__editReview">
      <h1>Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            required
            value={rating}
            onChange={updateRating}
          />
        </label>
        {errors.rating && <div className="errors">{errors.rating}</div>}
        <label>
          Review:
          <textarea
            placeholder="Review"
            value={editReview}
            onChange={updateReview}
          />
        </label>
        {errors.review && <div className="errors">{errors.review}</div>}
        <button type="submit">Edit Review</button>
      </form>
    </div>
  );
};

export default EditReviewForm;
