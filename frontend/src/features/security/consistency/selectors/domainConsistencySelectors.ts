import type {
  SecurityConsistencyState,
} from "../state/domainConsistencyState";

export const selectSecurityConsistencyStatus = (
  state: SecurityConsistencyState,
) => state.status;

export const selectSecurityConsistencyScore = (
  state: SecurityConsistencyState,
) => state.score;
