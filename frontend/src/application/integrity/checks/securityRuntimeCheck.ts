import {
  getSecurityRuntimeReadiness,
} from "../../security/runtime/runtimeReadiness";

export function securityRuntimeIntegrityCheck() {
  const readiness = getSecurityRuntimeReadiness();
  return {
    key: "security.runtime",
    domain: "security",
    status: readiness.authorizationReady
      ? "pass"
      : "fail",
    reason: readiness.authorizationReady
      ? "security-runtime-ready"
      : "security-runtime-not-ready",
    checkedAt: new Date().toISOString(),
  } as const;
}
