import type { SecuritySummary } from "../types/security"
import type { SecurityMetrics } from "../types/securityMetrics"

export function projectSecurityMetrics(
  summary?: SecuritySummary,
): SecurityMetrics {
  return {
    activeCredentials:
      summary?.activeCredentials ?? 0,

    revokedCredentials:
      summary?.revokedCredentials ?? 0,

    expiredCredentials: 0,

    restrictedAccess:
      summary?.restrictedAccesses ?? 0,

    frozenAccess:
      summary?.emergencyFreezeActive
        ? 1
        : 0,

    criticalEvents:
      summary?.criticalEvents ?? 0,
  }
}
