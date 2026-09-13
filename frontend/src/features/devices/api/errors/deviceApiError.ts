export interface DeviceApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
