export interface DeviceProjectionState {
  online: number
  offline: number
  failed: number
}

export function reduceDeviceEvent(
  state: DeviceProjectionState,
  event: {
    type: string
  },
): DeviceProjectionState {
  return {
    ...state,
    online:
      event.type.includes("connected")
        ? state.online + 1
        : state.online,
    offline:
      event.type.includes("disconnected")
        ? state.offline + 1
        : state.offline,
    failed:
      event.type.includes("failed")
        ? state.failed + 1
        : state.failed,
  }
}
