import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getLeasesPolicyContext() {
  return {
    policies:
      selectPolicies(
        "leases",
      ),
    guards:
      selectGuards(
        "leases",
      ),
  };
}
