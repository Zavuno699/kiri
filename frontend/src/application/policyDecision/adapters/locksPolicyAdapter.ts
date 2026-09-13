import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getLocksPolicyContext() {
  return {
    policies:
      selectPolicies(
        "locks",
      ),
    guards:
      selectGuards(
        "locks",
      ),
  };
}
