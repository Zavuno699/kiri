import { StatusPill } from "../../../components/ui/StatusPill"
import type {
  AccessState,
  CredentialStatus,
  SecurityEventSeverity,
  SecurityPosture,
} from "../types/security"

export function SecurityPosturePill({
  posture,
}: {
  posture: SecurityPosture
}) {
  const map = {
    secure: ["Secure", "success"],
    elevated: ["Elevated", "warning"],
    degraded: ["Degraded", "warning"],
    critical: ["Critical", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[posture]

  return <StatusPill label={label} tone={tone} />
}

export function CredentialStatusPill({
  status,
}: {
  status: CredentialStatus
}) {
  const map = {
    active: ["Active", "success"],
    revoked: ["Revoked", "danger"],
    expired: ["Expired", "warning"],
    suspended: ["Suspended", "warning"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}

export function AccessStatePill({
  state,
}: {
  state: AccessState
}) {
  const map = {
    granted: ["Granted", "success"],
    restricted: ["Restricted", "warning"],
    frozen: ["Frozen", "danger"],
    revoked: ["Revoked", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[state]

  return <StatusPill label={label} tone={tone} />
}

export function SecuritySeverityPill({
  severity,
}: {
  severity: SecurityEventSeverity
}) {
  const map = {
    info: ["Info", "info"],
    warning: ["Warning", "warning"],
    critical: ["Critical", "danger"],
  } as const

  const [label, tone] = map[severity]

  return <StatusPill label={label} tone={tone} />
}
