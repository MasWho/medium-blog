'use client'

import Nav from "./(components)/nav"

function PreLogin() {
  return (
    <main className="flex items-center justify-center w-full h-[80vh] text-xl text-center">
      Pre Login
    </main>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <PreLogin />
    </>
  );
}
