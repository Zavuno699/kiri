import type { OperatorActionState } from "../state/actionState";

export const selectVisibleActions = (
  state: OperatorActionState,
) => state.visibleActions;

export const selectAllActions = (
  state: OperatorActionState,
) => state.actions;
