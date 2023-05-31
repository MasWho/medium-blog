'use client'

import { ReactNode, createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";

type AuthContextProp = {
  username: string | null;
  userId: number | null;
  isLoggedIn: boolean;
  loginUser: (username: string, userId: number) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProp>({
  username: null,
  userId: null,
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export default function AuthContextProvider(props: {children: ReactNode}) {
  const {children} = props;

  const [ username, setUsername ] = useState<string | null>(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  const [ userId, setUserId ] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    if(username && userId) {
      loginUser(username!, Number(userId!));
    }
  }, [])

  const loginUser = (username: string, userId: number) => {
    setUsername(username);
    setIsLoggedIn(true);
    setUserId(userId);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId.toString());
    router.push('feature');
  };

  const logoutUser = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{username, isLoggedIn, userId, loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  )
}