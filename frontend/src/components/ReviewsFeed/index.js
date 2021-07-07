import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import EditReviewFormModal from "../EditReviewFormModal";
import * as reviewActions from "../../store/reviews";
import { NavLink } from "react-router-dom";

export default function ReviewsFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(reviewActions.deleteReview(e.target.value));
  };

  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id;
    }
    return null;
  });

  const reviews = useSelector((state) => {
    const reviewsList = Object.values(state.review);
    return reviewsList?.map((review) => (
      <div key={review.id} value={review.Beer.id} className="review__div">
        <NavLink to={`/beers/${review.Beer.id}`} className="review__navLink">
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
          {userId === review.userId ? (
            <div className="review__buttons">
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
          ) : (
            <div></div>
          )}
        </NavLink>
      </div>
    ));
  });

  return (
    <div>
      <h1 className="reviews__header">Reviews</h1>
      <div className="reviews__feedContainer">{reviews}</div>
    </div>
  );
}
