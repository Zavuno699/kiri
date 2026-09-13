export interface DeviceCommandContext {
  deviceId: string
  commandType: string
  reason: string
}

export type DeviceCommandStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "observe"

export interface DeviceCommandState {
  step: DeviceCommandStep
  context: DeviceCommandContext
}
