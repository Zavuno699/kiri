import type { OperatorActivityState } from "../state/operatorActivityState";

export const selectOperatorActivityItems = (
  state: OperatorActivityState,
) => state.items;

export const selectOperatorActivityReady = (
  state: OperatorActivityState,
) => state.initialized && !state.loading;
