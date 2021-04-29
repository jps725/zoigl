import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import AddBeerFormModal from "../AddBeerFormModal";
// import EditBeerFormModal from "../EditBeerFormModal";
import AddReviewFormModal from "../AddReviewFormModal";
import EditReviewFormModal from "../EditReviewFormModal";
import * as reviewActions from "../../store/reviews";

export default function Reviews() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(reviewActions.deleteReview(e.target.value));
  };

  const reviews = useSelector((state) => {
    const reviewsList = Object.values(state.reviews);
    return reviewsList?.map((review) => (
      <div key={review.id}>
        <h2>{review.name}</h2>
        <EditReviewFormModal review={review} />
        <button value={review.id} onClick={handleDelete}>
          Delete
        </button>
        <div>
          <div>{review.rating}</div>
          <div>{review.review}</div>
        </div>
      </div>
    ));
  });

  return (
    <div>
      <h1>Reviews</h1>
      <AddReviewFormModal />
      {reviews}
    </div>
  );
}
