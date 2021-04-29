import { csrfFetch } from "./csrf";

const LOAD = "beers/LOAD";
const ADD_ONE = "beers/ADD_ONE";
const UPDATE_ONE = "beers/UPDATE_ONE";
const REMOVE_ONE = "beers/REMOVE_ONE";

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

const removeBeer = (beerId) => ({
  type: REMOVE_ONE,
  beerId,
});

export const getBeers = () => async (dispatch) => {
  const res = await csrfFetch("/api/beers");

  if (res.ok) {
    const { beers } = await res.json();
    dispatch(load(beers));
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
    const newBeer = await res.json();
    dispatch(addBeer(newBeer.beer));
    return res;
  }
};

export const updateBeer = (beer) => async (dispatch) => {
  // const res = await csrfFetch(`/api/beers/${formData.id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(formData),
  // });
  // if (res.ok) {
  //   const updatedBeer = await res.json();
  //   dispatch(editBeer(updatedBeer));
  //   return updatedBeer;
  // }
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
  // formData.append("userId", userId);

  if (image) {
    formData.append("image", image);
  }
  console.log(beer);

  const res = await csrfFetch(`/api/beers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  if (res.ok) {
    const updatedBeer = await res.json();
    dispatch(editBeer(updatedBeer));
    return updatedBeer;
  }
  // const { name, style, status, ibus, abv, userId, image, id } = beer;
  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("style", style);
  // formData.append("status", status);
  // formData.append("ibus", ibus);
  // formData.append("abv", abv);
  // formData.append("userId", userId);
  // let beerImg;

  // if (image) {
  //   formData.append("image", image);
  //   beerImg = await dispatch(editImageForm(formData));
  //   /// new thunk create new backend route
  // }

  // const res = await csrfFetch(`/api/beers/${id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(beer),
  // });
  // if (res.ok) {
  //   const newBeer = await res.json();
  //   // dispatch(editBeer({ newBeer: newBeer.beer, ...beerImg }));
  //   dispatch(editBeer(newBeer.beer));
  //   return res;
  // }
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
