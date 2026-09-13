import { getSecurityRuntimeState } from "../../../../application/security/runtime/securityRuntimeStore";

export function lockEmergencyOperationAllowed(): boolean {
  const state = getSecurityRuntimeState();

  return (
    state.identity.authenticated &&
    Boolean(state.session.session) &&
    Boolean(state.permissions?.granted.includes("locks.command")) &&
    !state.frozen
  );
}
