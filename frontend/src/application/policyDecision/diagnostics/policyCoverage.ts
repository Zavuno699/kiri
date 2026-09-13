import {
  getPolicyDiagnostics,
} from "./policyDiagnostics";

export function getPolicyCoverage() {
  const diagnostics =
    getPolicyDiagnostics();

  return {
    policies:
      diagnostics.policyCount,

    guards:
      diagnostics.guardCount,

    decisions:
      diagnostics.decisionCount,

    allowed:
      diagnostics.allowedCount,

    denied:
      diagnostics.deniedCount,

    conditional:
      diagnostics.conditionalCount,

    ready:
      diagnostics.policyCount >=
        5 &&
      diagnostics.guardCount >=
        4,
  };
}
