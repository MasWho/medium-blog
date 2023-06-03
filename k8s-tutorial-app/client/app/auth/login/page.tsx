'use client'

import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../_context/provider";
import { ToastContext, ToastIntent } from "@/app/_components/toast/context";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const ctx = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: target.username.value,
          password: target.password.value
        })
      });
      
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      if(data.success) {
        ctx.loginUser(target.username.value, data.userId);
        toastCtx.showToast({message: 'Login Success', intent: ToastIntent.SUCCESS, delay: 2})
      }
    } catch (error) {
      toastCtx.showToast({message: 'Error Loging in', intent: ToastIntent.ERROR, delay: 2})
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <form className="flex flex-col h-full justify-center px-[30%]" onSubmit={submitFormHandler}>
      <h1 className="text-4xl mb-[3rem] text-center">Login</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="text" className="mb-[3rem] text-black p-[0.2rem]"/>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className="mb-[3rem] text-black p-[0.2rem]"/>
      {
        loading 
          ? <p className="text-center py-[0.4rem] border border-transparent">Loading...</p> 
          : <button className="border border-white w-[10rem] py-[0.4rem] mx-auto hover:bg-white/50">Confirm</button>
      }
    </form>
  )
};

export default Login;