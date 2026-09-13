import {
  paymentsConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshPaymentsConsistency() {
  return paymentsConsistencyCheck();
}
