export interface DeviceOutcome {
  commandId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
