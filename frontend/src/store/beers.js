import { csrfFetch } from "./csrf";

const LOAD = "beers/LOAD";
const ADD_ONE = "beers/ADD_ONE";

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

export const getBeers = () => async (dispatch) => {
  const res = await csrfFetch("/api/beers");

  if (res.ok) {
    const beerList = await res.json();
    dispatch(load(beerList));
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
    dispatch(addBeer(newBeer));
    return newBeer;
  }
};
const initialState = {};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        ...action.beerList,
      };
    }
    case ADD_ONE: {
      return {
        ...state,
        ...action.beerList,
      };
    }
    default:
      return state;
  }
};

export default beerReducer;
