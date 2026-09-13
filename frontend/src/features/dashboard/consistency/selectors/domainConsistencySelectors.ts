import type {
  DashboardConsistencyState,
} from "../state/domainConsistencyState";

export const selectDashboardConsistencyStatus = (
  state: DashboardConsistencyState,
) => state.status;

export const selectDashboardConsistencyScore = (
  state: DashboardConsistencyState,
) => state.score;
