import {
  getAuditState,
} from "../../audit/state/auditStore";

export function auditIntegrityCheck() {
  const state = getAuditState();

  return {
    key: "security.audit",
    domain: "security",
    status: state.error
      ? "fail"
      : state.initialized
        ? "pass"
        : "warn",
    reason: state.error ?? (
      state.initialized
        ? "audit-ready"
        : "audit-not-initialized"
    ),
    checkedAt: new Date().toISOString(),
  } as const;
}
