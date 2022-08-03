// Global imports

// Local imports
import { GlobalState, ReducerAction, ActionsEnum } from "./types";

export const defaultGlobalState: GlobalState = {
  test1: true,
  test2: 2,
  test3: "hello",
};

/**
 * Reducer used to map action triggered by components appropriate states
 * @param state
 * @param action 
 * @returns 
 */
export const epicTableReducer = (
  state: GlobalState = defaultGlobalState,
  action: ReducerAction
): GlobalState => {

  if (action.type === ActionsEnum.TEST_ACTION) {
    return {
      ...state,
      test3: action.payload.data
    };
  }

  // Default
  return { ...state };
};
