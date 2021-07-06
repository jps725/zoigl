import { csrfFetch } from "./csrf";

const LOAD = "beers/LOAD";
const ADD_ONE = "beers/ADD_ONE";
const UPDATE_ONE = "beers/UPDATE_ONE";
const REMOVE_ONE = "beers/REMOVE_ONE";
const LOAD_ONE = "beers/LOAD_ONE";

const load = (beerList) => {
  return {
    type: LOAD,
    beerList,
  };
};

const loadOne = (beer) => {
  return {
    type: LOAD_ONE,
    beer,
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

const removeBeer = (beerId, idx) => ({
  type: REMOVE_ONE,
  beerId,
  idx,
});

export const getBeers = () => async (dispatch) => {
  const res = await csrfFetch("/api/beers");
  if (res.ok) {
    const { beers } = await res.json();
    dispatch(load(beers));
  }
};

export const getOneBeer = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/beers/${id}`);
  if (res.ok) {
    const { beer } = await res.json();
    dispatch(loadOne(beer));
  }
};

export const createBeer = (beer) => async (dispatch) => {
  const { name, style, status, ibus, abv, userId, image } = beer;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("style", style);
  formData.append("status", status);
  formData.append("ibus", ibus);
  formData.append("abv", abv);
  formData.append("userId", userId);

  if (image) formData.append("image", image);

  const res = await csrfFetch("/api/beers", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });
  if (res.ok) {
    const { newBeer } = await res.json();
    dispatch(addBeer(newBeer));
    return newBeer;
  }
};

export const updateBeer = (beer) => async (dispatch) => {
  const { name, style, status, ibus, abv, image, id } = beer;
  const formData = new FormData();
  if (name) {
    formData.append("name", name);
  }
  if (style) {
    formData.append("style", style);
  }
  if (status) {
    formData.append("status", status);
  }
  if (ibus) {
    formData.append("ibus", ibus);
  }
  if (abv) {
    formData.append("abv", abv);
  }
  if (image) {
    formData.append("image", image);
  }

  const res = await csrfFetch(`/api/beers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  if (res.ok) {
    const { updatedWithInfo } = await res.json();
    dispatch(editBeer(updatedWithInfo));
    return updatedWithInfo;
  }
};

export const deleteBeer = (beerId, idx) => async (dispatch) => {
  await csrfFetch(`api/beers/${beerId}`, {
    method: "DELETE",
  });
  dispatch(removeBeer(beerId, idx));
  return;
};
const initialState = [];

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      let newState = [...action.beerList];
      return newState;
    }
    case ADD_ONE: {
      return [action.beer, ...state];
    }
    case UPDATE_ONE: {
      console.log(action.beer);
      return [action.beer, ...state];
    }
    case REMOVE_ONE: {
      const newState = [...state];
      newState.splice(action.idx, 1);
      return newState;
    }
    case LOAD_ONE: {
      console.log(action.beer);
      let newState = [action.beer];

      return newState;
    }

    default:
      return state;
  }
};

export default beerReducer;
