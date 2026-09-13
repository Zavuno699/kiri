export interface DeviceApiRecord {
  id: string
  status?: string
  version?: number
  updatedAt?: string
  metadata?: Record<string, unknown>
}
