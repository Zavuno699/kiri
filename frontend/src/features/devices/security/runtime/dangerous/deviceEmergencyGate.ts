import { getSecurityRuntimeState } from "../../../../application/security/runtime/securityRuntimeStore";

export function deviceEmergencyOperationAllowed(): boolean {
  const state = getSecurityRuntimeState();

  return (
    state.identity.authenticated &&
    Boolean(state.session.session) &&
    Boolean(state.permissions?.granted.includes("devices.command")) &&
    !state.frozen
  );
}
