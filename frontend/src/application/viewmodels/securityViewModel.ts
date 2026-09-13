import type {
  SecuritySummary,
} from "../../features/security/types/security"

export interface SecurityViewModel
  extends SecuritySummary {
  postureLabel: string
  freezeLabel: string
  credentialSummary: string
}

export function toSecurityViewModel(
  summary: SecuritySummary,
): SecurityViewModel {
  return {
    ...summary,
    postureLabel:
      summary.posture ?? "Unknown",
    freezeLabel:
      summary.emergencyFreezeActive
        ? "ACTIVE"
        : "INACTIVE",
    credentialSummary:
      `${summary.activeCredentials} active / ${summary.revokedCredentials} revoked`,
  }
}
