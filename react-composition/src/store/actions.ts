/**
 * Contains all available actions that can be processed by the reducer to update 
 * the centralised states.
 */

import { ActionPayload, ReducerAction, ActionsEnum } from "./types"

/**
 * Test action for now.
 * @param payload 
 * @returns 
 */
export const testAction = (payload: ActionPayload): ReducerAction => ({
  type: ActionsEnum.TEST_ACTION,
  payload,
});