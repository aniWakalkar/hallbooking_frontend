import { ActionTypes } from "./actionTypes"; // Import ActionTypes constants

const initialState = {
  isAuthenticated: false,
  token: null,
  role: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        role: action.payload.role,
      };
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export default userReducer;
