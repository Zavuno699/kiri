import type {
  DevicesConsistencyState,
} from "../state/domainConsistencyState";

export const selectDevicesConsistencyStatus = (
  state: DevicesConsistencyState,
) => state.status;

export const selectDevicesConsistencyScore = (
  state: DevicesConsistencyState,
) => state.score;
