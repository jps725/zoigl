import { csrfFetch } from "./csrf";

const LOAD = "images/LOAD";
const ADD_ONE = "images/ADD_ONE";
const UPDATE_ONE = "images/UPDATE_ONE";
const REMOVE_ONE = "images/REMOVE_ONE";

const loadImage = (image) => ({
  type: LOAD,
  image,
});

const addImage = (image) => ({
  type: ADD_ONE,
  image,
});

const editImage = (image) => ({
  type: UPDATE_ONE,
  image,
});

const removeImage = (imageId) => ({
  type: REMOVE_ONE,
  imageId,
});

export const getBeerImage = () => async (dispatch) => {
  const res = await csrfFetch("/api/images/:beerId");

  if (res.ok) {
    const { image } = await res.json();
    dispatch(load(image));
  }
};

export const getProfileImage = () => async (dispatch) => {
  const res = await csrfFetch("/api/images/:userId");

  if (res.ok) {
    const { image } = await res.json();
    dispatch(load(image));
  }
};

export const createBeer = (formData) => async (dispatch) => {
  const res = await csrfFetch("/api/beers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const newBeer = await res.json();
    dispatch(addBeer(newBeer.beer));
    return res;
  }
};

export const updateBeer = (formData) => async (dispatch) => {
  const res = await csrfFetch(`/api/beers/${formData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const updatedBeer = await res.json();
    dispatch(editBeer(updatedBeer));
    return updatedBeer;
  }
};

export const deleteBeer = (beerId) => async (dispatch) => {
  await csrfFetch(`api/beers/${beerId}`, {
    method: "DELETE",
  });
  dispatch(removeBeer(beerId));
  return;
};
const initialState = {};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      let newState = { ...state };
      action.beerList.forEach((beer) => {
        newState[beer.id] = beer;
      });
      return newState;
    }
    case ADD_ONE: {
      return {
        ...state,
        [action.beer.id]: action.beer,
      };
    }
    case UPDATE_ONE: {
      return {
        ...state,
        [action.beer.id]: action.beer,
      };
    }
    case REMOVE_ONE: {
      const newState = { ...state };
      delete newState[action.beerId];
      return newState;
    }

    default:
      return state;
  }
};

export default beerReducer;
