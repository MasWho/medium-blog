// Global imports

// Local imports
import { GlobalState, ReducerAction, ActionsEnum } from "./types";

export const defaultGlobalState: GlobalState = {
  data: [],
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
    };
  }

  // Default
  return { ...state };
};
