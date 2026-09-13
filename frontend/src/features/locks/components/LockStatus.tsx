import { StatusPill } from "../../../components/ui/StatusPill"
import type {
  LockReadiness,
  LockState,
} from "../types/lock"

export function LockStatePill({
  state,
}: {
  state: LockState
}) {
  const map = {
    locked: ["Locked", "success"],
    unlocked: ["Unlocked", "warning"],
    jammed: ["Jammed", "danger"],
    offline: ["Offline", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[state]

  return <StatusPill label={label} tone={tone} />
}

export function LockReadinessPill({
  readiness,
}: {
  readiness: LockReadiness
}) {
  const map = {
    ready: ["Ready", "success"],
    degraded: ["Degraded", "warning"],
    blocked: ["Blocked", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[readiness]

  return <StatusPill label={label} tone={tone} />
}
