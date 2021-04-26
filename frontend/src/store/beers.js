const LOAD = "beers/LOAD";

const load = (beerList) => {
  return {
    type: LOAD,
    beerList,
  };
};

export const getBeers = () => async (dispatch) => {
  const res = await fetch("/api/beers");

  if (res.ok) {
    const beerList = await res.json();
    dispatch(load(beerList));
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
    default:
      return state;
  }
};

export default beerReducer;
