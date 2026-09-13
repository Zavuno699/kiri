import type { DeviceState } from "../deviceState"

export function reduceDeviceState(
  state: DeviceState,
  event: string,
): DeviceState {
  switch (event) {
    case "devices.load":
      return "loading"

    case "devices.loaded":
      return "active"

    case "devices.degraded":
      return "degraded"

    case "devices.recovered":
      return "active"

    case "devices.failed":
      return "failed"

    default:
      return state
  }
}
