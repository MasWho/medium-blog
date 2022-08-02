// Global imports
import React, {useContext, useState} from "react";

// Local imports

// Store imports

type StoreProvidedValues = [
  GlobalState,
  // React.Dispatch<GlobalState | Function>?,
  React.Dispatch<React.SetStateAction<GlobalState>>?
];

export type GlobalState = {
  test1: boolean,
  test2: number,
  test3: string,
};

const defaultGlobalState: GlobalState = {
  test1: true,
  test2: 2,
  test3: 'hello',
};

const EpicTableStore = React.createContext<StoreProvidedValues>([defaultGlobalState]);
EpicTableStore.displayName = 'EpicTableStore';
export const useEpicTableStore = () => useContext(EpicTableStore);

type ProviderProps = {
  children?: React.ReactNode,
};

export const EpicTableStoreProvider: React.FC<ProviderProps> = ({children}) => {
  const [globalState, setGlobalState] = useState<GlobalState>(defaultGlobalState);
  return (
    <EpicTableStore.Provider value={[globalState, setGlobalState]}>
      {children}
    </EpicTableStore.Provider>
  );
};