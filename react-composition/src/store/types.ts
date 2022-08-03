// Action types
export enum ActionsEnum {
  TEST_ACTION = 'TEST_ACTION',
};

// Reducer types
export interface GlobalState {
  test1: boolean,
  test2: number,
  test3: string,
};

export interface ActionPayload {
  data: any,
};

export interface ReducerAction {
  type: ActionsEnum,
  payload: ActionPayload
};

// Context types
export type StoreProvidedValues = [
  GlobalState,
  React.Dispatch<ReducerAction>
];
