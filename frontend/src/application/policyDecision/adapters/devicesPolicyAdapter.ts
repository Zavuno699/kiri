import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getDevicesPolicyContext() {
  return {
    policies:
      selectPolicies(
        "devices",
      ),
    guards:
      selectGuards(
        "devices",
      ),
  };
}
