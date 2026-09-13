import type { LiveEvent } from "../events/liveEvent"

export interface LiveStatusProjection {
  domain: string
  status: string
  healthy: boolean
  degraded: boolean
  updatedAt: string
}

export function projectLiveStatus(
  event: LiveEvent,
): LiveStatusProjection {
  const degraded =
    event.type.includes("degraded") ||
    event.type.includes("failed")

  return {
    domain: event.domain,
    status: event.type,
    healthy: !degraded,
    degraded,
    updatedAt:
      new Date().toISOString(),
  }
}
