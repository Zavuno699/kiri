import {
  getAuditState,
} from "../../audit/state/auditStore";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function auditConsistencyCheck(): ConsistencyCheck {
  const state = getAuditState();
  const ready =
    state.error === null &&
    state.initialized;

  return {
    key: "security.audit.consistency",
    domain: "security",
    status: ready ? "consistent" : "warning",
    severity: ready ? "info" : "warning",
    score: ready ? 100 : 50,
    reason: ready
      ? "audit-state-available"
      : "audit-state-incomplete",
    checkedAt: new Date().toISOString(),
  };
}
