/**
 * Global context for auth related states and actions.
 */

// Global imports
import React, { createContext, useReducer, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthActionEnum } from "./authActions";
import authReducer from "./authReducer";

export interface AuthState {
  isLoggedIn: boolean;
  authToken?: string;
  userId?: string;
  name?: string;
  email?: string;
};


export type UserData = {
  authToken: string;
  userId: string;
  name: string;
  email: string;
};

export interface AuthContext {
  authState: AuthState,
  globalLogInDispatch: (props: UserData) => void,
  globalLogOutDispatch: () => void,
};

// Default states for context
export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

// Auth context
const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
});

type AuthProviderProps = {
  children: React.ReactElement,
}

/**
 * Component for providing AuthContext to all child components wrapped within.
 * Provides states and handlers linked to the reducer function here. 
 * @param {object} children 
 * @returns 
 */
export const AuthContextProvider = (props: AuthProviderProps) => {
  const {children} = props;

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();

  // Check if user detail is persisted, mostly catering for refreshing of the browser
  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({type: AuthActionEnum.LOG_IN, payload: userData});
    }
  }, []);

  /**
   * Dispatch a LOG_IN action to the authReducer
   * Requires user info as payload
   */
  const globalLogInDispatch = useCallback((props: UserData) => {
    const {authToken, email, name, userId} = props;
    authDispatch({
      type: AuthActionEnum.LOG_IN,
      payload: {
        authToken,
        userId,
        name,
        email,
      },
    });
    navigate('/resource');
  }, [navigate]);

  /**
   * Dispatch a LOG_OUT action to the authReducer
   * This will reset all auth related global states to default
   */
  const globalLogOutDispatch = useCallback(() => {
    authDispatch({type: AuthActionEnum.LOG_OUT, payload: null});
    navigate('/user/login');
  }, [navigate]);


  // Cart context values to be passed down to children
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch
  };

  return (
    <authCtx.Provider value={ctx}>
      {children}
    </authCtx.Provider>
  )
};

export default authCtx;