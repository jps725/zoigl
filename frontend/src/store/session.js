import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const userData = await res.json();
  dispatch(setUser(userData.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const userData = await res.json();
  dispatch(setUser(userData.user));
  return res;
};

export const signupUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const userData = await res.json();
  dispatch(setUser(userData.user));
  return res;
};

export const logoutUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  //   let newState;
  switch (action.type) {
    case SET_USER:
      //   newState = Object.assign({}, state);
      //   newState.user = action.user;
      //   return newState;
      return { ...state, user: action.user };

    case REMOVE_USER:
      //   newState = Object.assign({}, state);
      //   newState.user = null;
      //   return newState;
      return { ...state, user: null };

    default:
      return state;
  }
};

export default sessionReducer;
