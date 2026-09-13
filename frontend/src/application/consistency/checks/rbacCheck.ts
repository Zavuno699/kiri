import {
  getRBACState,
} from "../../rbac/state/rbacStore";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function rbacConsistencyCheck(): ConsistencyCheck {
  const state = getRBACState();
  const ready =
    state.initialized &&
    state.roles.length > 0 &&
    state.error === null;

  return {
    key: "security.rbac.consistency",
    domain: "security",
    status: ready ? "consistent" : "warning",
    severity: ready ? "info" : "warning",
    score: ready ? 100 : 40,
    reason: ready
      ? "rbac-state-consistent"
      : "rbac-state-incomplete",
    checkedAt: new Date().toISOString(),
  };
}
