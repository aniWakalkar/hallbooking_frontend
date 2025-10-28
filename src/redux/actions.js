import { ActionTypes } from "./actionTypes";

// Action Creators
export const setUser = (token, role) => ({
  type: ActionTypes.SET_USER,
  payload: { token, role },
});

export const logoutUser = () => ({
  type: ActionTypes.LOGOUT_USER,
});
