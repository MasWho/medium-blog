// Action types
export enum ActionsEnum {
  TEST_ACTION = 'TEST_ACTION',
};

// Reducer types
export interface GlobalState {
  data: {
    [dataField: string]: any
  }
};

export interface ActionPayload {
  [dataField: string]: any,
};

export interface ReducerAction {
  type: ActionsEnum,
  payload: ActionPayload
};

// Context types
export interface StoreProvidedValues {
  globalState: GlobalState,
  dispatch: React.Dispatch<ReducerAction>
};