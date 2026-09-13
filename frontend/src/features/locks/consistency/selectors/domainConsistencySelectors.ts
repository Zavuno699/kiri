import type {
  LocksConsistencyState,
} from "../state/domainConsistencyState";

export const selectLocksConsistencyStatus = (
  state: LocksConsistencyState,
) => state.status;

export const selectLocksConsistencyScore = (
  state: LocksConsistencyState,
) => state.score;
