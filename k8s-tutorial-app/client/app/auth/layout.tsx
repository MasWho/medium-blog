import Nav from "../_components/nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <section className="text-xl fixed left-0 px-[3rem] w-full h-[80vh]">
        {children}
      </section>
    </>
  )
}
