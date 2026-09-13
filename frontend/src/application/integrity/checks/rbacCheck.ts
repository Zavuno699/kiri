import {
  getRBACState,
} from "../../rbac/state/rbacStore";

export function rbacIntegrityCheck() {
  const state = getRBACState();

  return {
    key: "security.rbac",
    domain: "security",
    status:
      state.initialized && state.roles.length > 0
        ? "pass"
        : "warn",
    reason:
      state.initialized
        ? "rbac-initialized"
        : "rbac-not-initialized",
    checkedAt: new Date().toISOString(),
  } as const;
}
