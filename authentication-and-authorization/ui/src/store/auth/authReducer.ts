import { Reducer } from "react";
import { AuthState, defaultAuthState } from "./AuthContextProvider";
import { AuthAction } from "./authActions";

/**
 * reducer for mapping all auth related actions to states
 * @param {object} state 
 * @param {object} action 
 */
const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {

  // user successfully authenticated
  if(action.type === "LOG_IN") {
    localStorage.setItem('user', JSON.stringify(action.payload));
    return {
      ...state,
      isLoggedIn: true,
      authToken: action.payload.authToken,
      userId: action.payload.userId,
      name: action.payload.name,
      email: action.payload.email,
    };
  }

  // log out user
  if(action.type === "LOG_OUT") {
    localStorage.removeItem('user');
    return defaultAuthState;
  }

  return defaultAuthState;
};

export default authReducer;