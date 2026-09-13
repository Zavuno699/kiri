import {
  registerCanonicalTransactions,
} from "../transactions/registerCanonicalTransactions";

import {
  registerCanonicalSagas,
} from "../sagas/registerCanonicalSagas";

import {
  registerCanonicalRetryPolicies,
} from "../retry/retryPolicyRegistry";

import {
  registerCanonicalRecoveryActions,
} from "../recovery/recoveryRegistry";

let initialized =
  false;

export function initializeTransactionFabric(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalTransactions();
  registerCanonicalSagas();
  registerCanonicalRetryPolicies();
  registerCanonicalRecoveryActions();
}
