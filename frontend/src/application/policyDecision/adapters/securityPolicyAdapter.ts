import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getSecurityPolicyContext() {
  return {
    policies:
      selectPolicies(
        "security",
      ),
    guards:
      selectGuards(
        "security",
      ),
  };
}
