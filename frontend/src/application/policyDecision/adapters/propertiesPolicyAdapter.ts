import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getPropertiesPolicyContext() {
  return {
    policies:
      selectPolicies(
        "properties",
      ),
    guards:
      selectGuards(
        "properties",
      ),
  };
}
