import {
  ObservableState,
} from "../../../application/state/observableState"

export interface DeviceRuntimeState {
  selectedDeviceId?: string
  commandInFlight: boolean
  lastCommandId?: string
  error?: string
}

export const deviceRuntime =
  new ObservableState<DeviceRuntimeState>(
    {
      commandInFlight: false,
    },
  )

export function selectDevice(
  deviceId: string,
): void {
  deviceRuntime.update(
    (current) => ({
      ...current,
      selectedDeviceId: deviceId,
      error: undefined,
    }),
  )
}
