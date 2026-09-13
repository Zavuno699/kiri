export type DeviceCommandWorkflowStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "observe"
  | "complete"

export interface DeviceCommandWorkflowState {
  step: DeviceCommandWorkflowStep
  deviceId: string
  commandType: string
  commandId?: string
  error?: string
}
