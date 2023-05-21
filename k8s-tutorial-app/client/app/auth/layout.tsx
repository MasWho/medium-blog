import Nav from "../(components)/nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <section className="text-xl flex flex-col items-center">
        {children}
      </section>
    </>
  )
}
