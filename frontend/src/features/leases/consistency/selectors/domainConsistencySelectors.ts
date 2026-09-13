import type {
  LeasesConsistencyState,
} from "../state/domainConsistencyState";

export const selectLeasesConsistencyStatus = (
  state: LeasesConsistencyState,
) => state.status;

export const selectLeasesConsistencyScore = (
  state: LeasesConsistencyState,
) => state.score;
