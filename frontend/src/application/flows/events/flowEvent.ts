export interface FlowEvent<TPayload = unknown> {
  type: string
  payload: TPayload
  occurredAt: string
}

export function flowEvent<TPayload>(
  type: string,
  payload: TPayload,
): FlowEvent<TPayload> {
  return {
    type,
    payload,
    occurredAt: new Date().toISOString(),
  }
}
