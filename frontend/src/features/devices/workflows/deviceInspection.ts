export type DeviceInspectionStep =
  | "identity"
  | "connectivity"
  | "telemetry"
  | "health"
  | "events"
  | "complete"

export interface DeviceInspectionContext {
  deviceId: string
}

export interface DeviceInspectionState {
  step: DeviceInspectionStep
  context: DeviceInspectionContext
}
