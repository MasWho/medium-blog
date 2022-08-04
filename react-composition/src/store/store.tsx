// Global imports
import React, { useContext, useReducer } from "react";

// Local imports
import { StoreProvidedValues } from "./types";
import { defaultGlobalState, epicTableReducer } from "./reducer";

// This creates the global context to be used for providing states to children components
const EpicTableContext = React.createContext<StoreProvidedValues>({
  globalState: defaultGlobalState,
  dispatch: () => {},
});
EpicTableContext.displayName = "EpicTableStore";
export const useEpicTableStore = () => useContext(EpicTableContext);

interface EpicTableContainerProps {
  children?: React.ReactNode,
  data?: {
    [dataField: string]: any
  }[]
};

/**
 * This is the table container component that wraps any children and provides the global state implemented using reducers
 * @param prop 
 * @returns 
 */
const EpicTableContainer: React.FC<EpicTableContainerProps> = ({
  children,
  data
}) => {
  if(!!data) defaultGlobalState.data = data;
  const [globalState, dispatch] = useReducer(epicTableReducer, defaultGlobalState);

  const contextValues = {
    globalState,
    dispatch
  };

  return (
    <EpicTableContext.Provider value={contextValues}>
      {children}
    </EpicTableContext.Provider>
  );
};

export default EpicTableContainer;