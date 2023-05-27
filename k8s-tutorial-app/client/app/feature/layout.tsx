import Nav from "../_components/nav";
import EventsContextProvider from "../_events/context";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventsContextProvider>
      <Nav />
      <section className="text-xl fixed left-0 px-[3rem] w-full h-[80vh]">
        {children}
      </section>
    </EventsContextProvider>
  );
}
