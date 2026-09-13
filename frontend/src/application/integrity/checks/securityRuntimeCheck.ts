import {
  securityRuntimeReady,
} from "../../security/runtime/runtimeReadiness";

export function securityRuntimeIntegrityCheck() {
  return {
    key: "security.runtime",
    domain: "security",
    status: securityRuntimeReady()
      ? "pass"
      : "fail",
    reason: securityRuntimeReady()
      ? "security-runtime-ready"
      : "security-runtime-not-ready",
    checkedAt: new Date().toISOString(),
  } as const;
}
