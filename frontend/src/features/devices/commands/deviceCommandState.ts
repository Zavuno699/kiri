export interface DeviceCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialDeviceCommandState: DeviceCommandState = {
  running: false,
}
