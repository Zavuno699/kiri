import type {
  OperationalSecurity,
} from "../../../domain/contracts"

export function securitySummary(
  security: OperationalSecurity,
) {
  return {
    id: security.id,
    subjectId:
      security.subjectId ?? "—",
    status:
      security.status ?? "unknown",
    accessGranted:
      security.accessGranted === undefined
        ? "unknown"
        : security.accessGranted
          ? "granted"
          : "denied",
    restrictedAccess:
      security.restrictedAccess === undefined
        ? "—"
        : String(security.restrictedAccess),
    credentialState:
      security.credentialState ?? "—",
    lastEventAt:
      security.lastEventAt ?? "—",
  }
}
