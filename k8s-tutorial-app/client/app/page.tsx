'use client'

import { useContext, useEffect } from "react";
import Nav from "./(components)/nav"
import { AuthContext } from "./auth/_context/provider";

function PreLogin() {
  return (
    <main className="flex items-center justify-center w-full h-[80vh] text-xl text-center">
      Pre Login
    </main>
  );
}

function PostLogin() {
  return (
    <main className="flex items-center justify-center w-full h-[80vh] text-xl text-center">
      Post Login
    </main>
  );
}

export default function Home() {
  const ctx = useContext(AuthContext);

  const content = ctx.isLoggedIn ? <PostLogin /> : <PreLogin />;

  return (
    <>
      <Nav />
      {content}
    </>
  );
}
