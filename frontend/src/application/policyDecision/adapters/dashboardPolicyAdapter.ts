import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getDashboardPolicyContext() {
  return {
    policies:
      selectPolicies(
        "dashboard",
      ),
    guards:
      selectGuards(
        "dashboard",
      ),
  };
}
