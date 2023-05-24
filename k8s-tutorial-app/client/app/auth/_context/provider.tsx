'use client'

import { ReactNode, createContext, useEffect, useState } from "react"

type AuthContextProp = {
  username: string | null;
  isLoggedIn: boolean;
  loginUser: (username: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProp>({
  username: null,
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export default function AuthContextProvider(props: {children: ReactNode}) {
  const {children} = props;

  const [ username, setUsername ] = useState<string | null>(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem('user');
    if(alreadyLoggedIn) {
      setUsername(username);
      setIsLoggedIn(true);
    }
  }, [])

  const loginUser = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('user', username);
  };

  const logoutUser = () => {
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{username, isLoggedIn, loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  )
}