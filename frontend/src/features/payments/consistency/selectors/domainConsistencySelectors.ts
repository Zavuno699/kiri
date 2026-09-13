import type {
  PaymentsConsistencyState,
} from "../state/domainConsistencyState";

export const selectPaymentsConsistencyStatus = (
  state: PaymentsConsistencyState,
) => state.status;

export const selectPaymentsConsistencyScore = (
  state: PaymentsConsistencyState,
) => state.score;
