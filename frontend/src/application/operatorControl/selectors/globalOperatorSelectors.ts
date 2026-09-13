import type {
  GlobalOperatorControlState,
} from "../state/globalOperatorControlState";

export const selectOperatorReady = (
  state: GlobalOperatorControlState,
): boolean => state.operatorReady;

export const selectOperatorDegraded = (
  state: GlobalOperatorControlState,
): boolean =>
  state.degradedMode !== "normal";

export const selectOperatorReasons = (
  state: GlobalOperatorControlState,
): string[] => state.reasons;

export const selectOperatorConsistencyScore = (
  state: GlobalOperatorControlState,
): number => state.consistencyScore;

export const selectOperatorDomainHealthScore = (
  state: GlobalOperatorControlState,
): number => state.domainHealthScore;
