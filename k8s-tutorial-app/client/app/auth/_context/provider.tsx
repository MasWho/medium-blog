'use client'

import { ReactNode, createContext, useState } from "react"

type AuthContextProp = {
  username: string | null;
  isLoggedIn: boolean;
  setUsername: (username: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextProp>({
  username: null,
  isLoggedIn: false,
  setUsername: () => {},
  setIsLoggedIn: () => {},
});

export default function AuthContextProvider(props: {children: ReactNode}) {
  const {children} = props;

  const [ username, setUsername ] = useState<string | null>(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{username, isLoggedIn, setUsername, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}