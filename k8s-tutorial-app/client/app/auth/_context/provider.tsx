'use client'

import { ReactNode, createContext, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation";

type AuthContextProp = {
  username: string | null;
  userId: number | null;
  isLoggedIn: boolean;
  sessionToken: string | null;
  loginUser: (username: string, userId: number) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProp>({
  username: null,
  userId: null,
  isLoggedIn: false,
  sessionToken: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export default function AuthContextProvider(props: {children: ReactNode}) {
  const {children} = props;

  const [ username, setUsername ] = useState<string | null>(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  const [ userId, setUserId ] = useState<number | null>(null);
  const [ sessionToken, setSessionToken ] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = useCallback((username: string, userId: number, sessionToken?: string) => {
    setUsername(username);
    setIsLoggedIn(true);
    setUserId(userId);
    // Generate a random token for the user
    if(!sessionToken) {
      sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    setSessionToken(sessionToken);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('sessionToken', sessionToken);
    router.push('feature');
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const sessionToken = localStorage.getItem('sessionToken');
    if(username && userId && sessionToken) {
      loginUser(username!, Number(userId!), sessionToken!);
    } else {
      router.push('/');
    }
  }, [loginUser])

  const logoutUser = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setUserId(null);
    setSessionToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionToken');
  }

  return (
    <AuthContext.Provider value={{username, isLoggedIn, userId, sessionToken, loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  )
}