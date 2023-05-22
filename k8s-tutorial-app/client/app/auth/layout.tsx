import Nav from "../(components)/nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <section className="text-xl fixed left-0 px-[3rem] w-full h-[100vh]">
        {children}
      </section>
    </>
  )
}
