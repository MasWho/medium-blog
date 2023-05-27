'use client'

import { ReactNode, createContext, useEffect, useState } from "react"
import Toast from "./toast";

export enum ToastIntent {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

type ToastContextProp = {
  showToast: (args: {message: string, intent: ToastIntent, delay: number}) => void;
}

export const ToastContext = createContext<ToastContextProp>({
  showToast: () => {},
});

export default function ToastContextProvider(props: {children: ReactNode}) {
  const {children} = props;

  const [ show, setShow ] = useState<boolean>(false);
  const [ message, setMessage ] = useState<string>('');
  const [ intent, setIntent ] = useState<ToastIntent>(ToastIntent.INFO);
  const [ delay, setDelay ] = useState<number>(0);

  const showToast = (args: {message: string, intent: ToastIntent, delay: number}) => {
    const { message, intent, delay } = args;
    setShow(true);
    setMessage(message);
    setIntent(intent);
    setDelay(delay);
  }

  useEffect(() => {
    if(show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  return (
    <ToastContext.Provider value={{showToast}}>
      {show && <Toast message={message} intent={intent} />}
      {children}
    </ToastContext.Provider>
  )
}