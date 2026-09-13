import {
  listPolicies,
} from "../registry/policyRegistry";

import {
  listGuards,
} from "../guards/guardRegistry";

import {
  listDecisions,
} from "../decisions/decisionStore";

import {
  getPolicyState,
} from "../state/policyStateStore";

export function getPolicyDiagnostics() {
  const decisions =
    listDecisions();

  return {
    policyCount:
      listPolicies().length,

    guardCount:
      listGuards().length,

    decisionCount:
      decisions.length,

    allowedCount:
      decisions.filter(
        (decision) =>
          decision.outcome ===
          "allow",
      ).length,

    deniedCount:
      decisions.filter(
        (decision) =>
          decision.outcome ===
            "deny" ||
          decision.outcome ===
            "blocked",
      ).length,

    conditionalCount:
      decisions.filter(
        (decision) =>
          decision.outcome ===
          "conditional",
      ).length,

    state:
      getPolicyState(),
  };
}
