export interface FlowCommand<TPayload = unknown> {
  type: string
  payload: TPayload
}
