'use client'

import { ReactNode, createContext, useEffect, useState } from "react"
import ClientConnection from "./ClientConnection";

type EventsContextProps = {
  data: any,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  setData: (data: any) => void,
}

export const EventsContext = createContext<EventsContextProps>({
  data: null,
  loading: false,
  setLoading: () => {},
  setData: () => {},
});

export default function EventsContextProvider(props: {children: ReactNode}) {
  const {children} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const handleEvent = (message: MessageEvent) => {
    const data = message.data;
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    let clientConnection: ClientConnection | null = null;
    if('EventSource' in window) {
      clientConnection = new ClientConnection({url: '/api/events', onMessage: handleEvent});
    }

    return () => {
      if(clientConnection) {
        clientConnection.source.close();
      }
    }
  }, []);

  return (
    <EventsContext.Provider value={{data, setLoading, setData, loading}}>
      {children}
    </EventsContext.Provider>
  )
}