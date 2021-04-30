import { csrfFetch } from "./csrf";
import * as beerActions from "./beers";

const LOAD = "reviews/LOAD";
const ADD_ONE = "reviews/ADD_ONE";
const UPDATE_ONE = "reviews/UPDATE_ONE";
const REMOVE_ONE = "reviews/REMOVE_ONE";

const loadReviews = (reviews) => {
  return {
    type: LOAD,
    reviews,
  };
};

const addReview = (review) => ({
  type: ADD_ONE,
  review,
});

const editReview = (review) => ({
  type: UPDATE_ONE,
  review,
});

const removeReview = (reviewId) => ({
  type: REMOVE_ONE,
  reviewId,
});

export const getReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews");
  if (res.ok) {
    const { reviews } = await res.json();
    dispatch(loadReviews(reviews));
  }
};

// export const getReviewsForBeer = () => async (dispatch) => {
//   const beerId = req.params.id;
//   const res = await csrfFetch(`/api/reviews/${beerId}`);
// };

export const createReview = (formData) => async (dispatch) => {
  const res = await csrfFetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview));
    dispatch(beerActions.getBeers());
    return newReview;
  }
};

export const updateReview = (formData) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${formData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const { updatedReview } = await res.json();
    dispatch(editReview(updatedReview));
    return updatedReview;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  dispatch(removeReview(reviewId));
  return;
};
const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      let newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case ADD_ONE: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case UPDATE_ONE: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case REMOVE_ONE: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }

    default:
      return state;
  }
};

export default reviewReducer;
