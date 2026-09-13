export interface ApplicationQuery<TPayload = unknown> {
  type: string
  payload?: TPayload
  correlationId?: string
}
