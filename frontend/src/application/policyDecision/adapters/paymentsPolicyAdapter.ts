import {
  selectPolicies,
} from "../selectors/selectPolicies";

import {
  selectGuards,
} from "../selectors/selectGuards";

export function getPaymentsPolicyContext() {
  return {
    policies:
      selectPolicies(
        "payments",
      ),
    guards:
      selectGuards(
        "payments",
      ),
  };
}
