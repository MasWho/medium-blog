'use client'

import Nav from "./(components)/nav"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex items-center justify-center w-full h-[80vh] text-xl text-center">
        Home Page
      </main>
    </>
  );
}
