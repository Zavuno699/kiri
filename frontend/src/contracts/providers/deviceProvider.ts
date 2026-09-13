export interface DeviceProviderContract {
  provider: string
  deviceId: string
  operation: string
  status: string
  providerReference?: string
  occurredAt?: string
}
