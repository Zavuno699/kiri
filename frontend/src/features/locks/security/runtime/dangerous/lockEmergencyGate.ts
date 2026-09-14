import { getSecurityRuntimeState } from "../../../../../application/security/runtime/securityRuntimeStore";

export function lockEmergencyOperationAllowed(): boolean {
  const state = getSecurityRuntimeState();

  return Boolean(
    state.identity.authenticated &&
    state.session.session &&
    state.permissions?.includes("locks.command") &&
    !state.frozen
  );
}
