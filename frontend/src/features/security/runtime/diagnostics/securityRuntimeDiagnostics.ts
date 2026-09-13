import {
  getSecurityRuntimeState,
} from "../state/securityRuntimeState";

export function getSecurityRuntimeDiagnostics() {
  return {
    domain:
      "security",

    runtime:
      getSecurityRuntimeState(),
  };
}
