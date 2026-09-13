import {
  getSecurityDiagnostics,
} from "./securityDiagnostics";

export function getSecuritySnapshot() {
  const diagnostics =
    getSecurityDiagnostics();

  return {
    mode:
      diagnostics.mode,

    principalActive:
      diagnostics.principal
        ?.active === true,

    sessionActive:
      diagnostics.session
        ?.active === true,

    frozen:
      diagnostics.freeze
        .frozen,

    recoveryRequired:
      diagnostics.freeze
        .recoveryRequired,

    capabilityCount:
      diagnostics.capabilityCount,

    policyCount:
      diagnostics.policyCount,

    credentialCount:
      diagnostics.credentialCount,

    auditCount:
      diagnostics.auditCount,
  };
}
