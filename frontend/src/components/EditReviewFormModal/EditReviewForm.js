import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import "./EditReviewForm.css";

const EditReviewForm = ({ onClose, review }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [rating, setRating] = useState(review.rating);
  const [editReview, setReview] = useState(review.review);
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => setRating(e.target.value);
  const updateReview = (e) => setReview(e.target.value);

  if (!userId) return alert("Must be signed in to do that");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = { rating, editReview, userId };
    dispatch(reviewActions.createReview(updatedReview)).catch(async (res) => {
      const reviewData = await res.json();
      if (reviewData && reviewData.errors);
      setErrors(reviewData.errors);
    });

    onClose();
  };

  return (
    <div className="form__editReview">
      <h1>Edit Review</h1>

      {errors.length > 0 &&
        errors.map((error) => (
          <div className="errors" key={error}>
            {error}
          </div>
        ))}
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
        <label>
          <textarea
            placeholder="Review"
            value={editReview}
            onChange={updateReview}
          />
        </label>
        <button type="submit">Edit Review</button>
      </form>
    </div>
  );
};

export default EditReviewForm;
