export interface ApplicationCommand<TPayload = unknown> {
  type: string
  payload: TPayload
  correlationId?: string
}
