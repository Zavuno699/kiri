export interface DeviceOutcomeProjection {
  operationId: string
  status:
    | "pending"
    | "success"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}
