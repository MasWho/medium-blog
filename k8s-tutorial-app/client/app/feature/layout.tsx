import Nav from "../(components)/nav"

export default function FeatureLayout({
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
