import type { DeviceState } from "../deviceState"

export interface DeviceStateMachine {
  state: DeviceState
  transition(
    next: DeviceState,
  ): DeviceState
}

export function createDeviceStateMachine():
  DeviceStateMachine {
  let state: DeviceState = "unknown"

  return {
    get state() {
      return state
    },

    transition(next) {
      state = next
      return state
    },
  }
}
