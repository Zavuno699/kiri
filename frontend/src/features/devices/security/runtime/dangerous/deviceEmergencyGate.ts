import { getSecurityRuntimeState } from "../../../../../application/security/runtime/securityRuntimeStore";

export function deviceEmergencyOperationAllowed(): boolean {
  const state = getSecurityRuntimeState();

  return Boolean(
    state.identity.authenticated &&
    state.session.session &&
    state.permissions?.includes("devices.command") &&
    !state.frozen
  );
}
