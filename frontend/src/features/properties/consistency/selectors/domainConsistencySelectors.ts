import type {
  PropertiesConsistencyState,
} from "../state/domainConsistencyState";

export const selectPropertiesConsistencyStatus = (
  state: PropertiesConsistencyState,
) => state.status;

export const selectPropertiesConsistencyScore = (
  state: PropertiesConsistencyState,
) => state.score;
