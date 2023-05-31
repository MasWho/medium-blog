"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ClientConnection from "./ClientConnection";
import { AuthContext } from "../auth/_context/provider";

type EventsContextProps = {
  data: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const EventsContext = createContext<EventsContextProps>({
  data: null,
  loading: false,
  setLoading: () => {},
});

export default function EventsContextProvider(props: {children: ReactNode;}) {
  const { children } = props;
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const handleEvent = (message: MessageEvent) => {
    const data = JSON.parse(message.data);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    let clientConnection: ClientConnection | null = null;
    if ("EventSource" in window) {
      if (authCtx.userId) {
        clientConnection = new ClientConnection({
          url: `/api/events?user=${authCtx.userId}`,
          onMessage: handleEvent,
        });
      }
    }

    return () => {
      if (clientConnection) {
        clientConnection.source.close();
      }
    };
  }, [authCtx.userId]);

  return (
    <EventsContext.Provider
      value={{
        data,
        setLoading,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
