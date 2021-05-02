import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import EditReviewFormModal from "../EditReviewFormModal";
import * as reviewActions from "../../store/reviews";

export default function ReviewsFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(reviewActions.deleteReview(e.target.value));
  };

  const reviews = useSelector((state) => {
    const reviewsList = Object.values(state.review);
    return reviewsList?.map((review) => (
      <div key={review.id} value={review.Beer.id} className="review__div">
        <div>
          <div className="beerName__grid">Beer Name: {review.Beer.name}</div>
          <div className="brewery__grid">
            Brewery: {review.Beer.User.breweryName}
          </div>
          <div className="rating__grid">Rating: {review.rating}</div>
          <div className="review__grid">Review: {review.review}</div>
          <img
            className="beer__img"
            src={review.Beer.beerImageUrl}
            alt="beer logo"
          />
        </div>
        <div className="editReview__grid">
          <EditReviewFormModal review={review} />
        </div>
        <button
          value={review.id}
          onClick={handleDelete}
          className="deleteReview__grid"
        >
          Delete
        </button>
      </div>
    ));
  });

  return (
    <div>
      <h1>Reviews</h1>
      <div className="reviews__feedContainer">{reviews}</div>
    </div>
  );
}
