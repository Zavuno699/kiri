import type { OperationalSecurity } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalSecurity(
  value: Record<string, unknown>,
): OperationalSecurity {
  return {
    id: stringValue(value.id),
    subjectId: optionalString(
      value.subjectId ??
      value.subject_id,
    ),
    status: optionalString(value.status),
    accessGranted:
      typeof value.accessGranted === "boolean"
        ? value.accessGranted
        : undefined,
    restrictedAccess: optionalNumber(
      value.restrictedAccess ??
      value.restrictedAccesses,
    ),
    credentialState: optionalString(
      value.credentialState ??
      value.credential_state,
    ),
    lastEventAt: optionalString(
      value.lastEventAt ??
      value.last_event_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
