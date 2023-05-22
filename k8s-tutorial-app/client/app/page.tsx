'use client'

import Nav from "./(components)/nav"
import { AuthContextProvider } from "./auth/_context/provider"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full h-[100vh] text-xl text-center">
        Home Page
      </main>
    </>
  );
}
