export interface DeviceProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduceDeviceProjection(
  state: DeviceProjectionState,
  event: {
    type: string
  },
): DeviceProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
