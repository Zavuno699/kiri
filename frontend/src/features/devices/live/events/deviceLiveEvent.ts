export interface DeviceLiveEvent<T = unknown> {
  id: string
  domain: "devices"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
