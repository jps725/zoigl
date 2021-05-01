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
      <div key={review.id} value={review.Beer.id}>
        <div>
          <div>Beer Name: {review.Beer.name}</div>
          <div>Brewery: {review.Beer.User.breweryName}</div>
          <div>Rating: {review.rating}</div>
          <div>Review: {review.review}</div>
          <img
            className="beer__img"
            src={review.Beer.beerImageUrl}
            alt="beer logo"
          />
        </div>
        <EditReviewFormModal review={review} />
        <button value={review.id} onClick={handleDelete}>
          Delete
        </button>
      </div>
    ));
  });

  return (
    <div>
      <h1>Reviews</h1>
      {reviews}
    </div>
  );
}
