import type { DeviceState } from "../deviceState"

export interface DeviceTransition {
  from: DeviceState
  to: DeviceState
  event: string
}

export const deviceTransitions:
  DeviceTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "devices.load",
  },
  {
    from: "loading",
    to: "active",
    event: "devices.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "devices.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "devices.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "devices.failed",
  },
]
