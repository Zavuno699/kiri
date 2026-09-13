import {
  registerSecurityPolicy,
} from "../registry/policyRegistry";

import {
  buildCanonicalPolicies,
} from "./canonicalPolicies";

export function registerCanonicalPolicies(): void {
  for (
    const policy of buildCanonicalPolicies()
  ) {
    registerSecurityPolicy(
      policy,
    );
  }
}
