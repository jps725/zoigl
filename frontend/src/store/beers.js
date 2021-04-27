import { csrfFetch } from "./csrf";

const LOAD = "beers/LOAD";
const ADD_ONE = "beers/ADD_ONE";
const UPDATE_ONE = "beers/UPDATE_ONE";

const load = (beerList) => {
  return {
    type: LOAD,
    beerList,
  };
};

const addBeer = (beer) => ({
  type: ADD_ONE,
  beer,
});

const editBeer = (beer) => ({
  type: UPDATE_ONE,
  beer,
});

export const getBeers = () => async (dispatch) => {
  const res = await csrfFetch("/api/beers");

  if (res.ok) {
    const { beers } = await res.json();
    console.log(beers);
    dispatch(load(beers));
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
  console.log(formData);
  const res = await csrfFetch(`/api/beers/${formData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const updatedBeer = await res.json();
    console.log("update", updatedBeer);
    dispatch(editBeer(updatedBeer));
    return updatedBeer;
  }
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

    default:
      return state;
  }
};

export default beerReducer;
