import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import "./ReviewForm.css";

const AddReviewForm = ({ onClose, beer }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const beerId = beer.id;

  const updateRating = (e) => setRating(e.target.value);
  const updateReview = (e) => setReview(e.target.value);

  if (!userId) return alert("Must be signed in to do that");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addReview = { rating, review, userId, beerId };
    dispatch(reviewActions.createReview(addReview)).catch(async (res) => {
      const reviewData = await res.json();
      if (reviewData && reviewData.errors);
      setErrors(reviewData.errors);
    });

    onClose();
  };

  return (
    <div className="form__addReview">
      <h1>Add New Review</h1>

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
            value={review}
            onChange={updateReview}
          />
        </label>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
};

export default AddReviewForm;
