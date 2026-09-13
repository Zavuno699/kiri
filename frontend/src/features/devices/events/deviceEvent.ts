export interface DeviceEvent<T = unknown> {
  id: string
  type: string
  domain: "devices"
  payload: T
  occurredAt: string
  correlationId?: string
}
