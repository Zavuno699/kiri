import {
  registerCanonicalPolicies,
} from "../policies/registerCanonicalPolicies";

import {
  registerCanonicalGuards,
} from "../guards/guardRegistry";

let initialized =
  false;

export function initializePolicyDecision(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalPolicies();
  registerCanonicalGuards();
}
