import {
  getSecurityRuntimeReadiness,
} from "../../security/runtime/runtimeReadiness";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function securityConsistencyCheck(): ConsistencyCheck {
  const ready = getSecurityRuntimeReadiness().authorizationReady;

  return {
    key: "security.runtime.consistency",
    domain: "security",
    status: ready ? "consistent" : "critical",
    severity: ready ? "info" : "critical",
    score: ready ? 100 : 0,
    reason: ready
      ? "security-runtime-ready"
      : "security-runtime-unavailable",
    checkedAt: new Date().toISOString(),
  };
}
