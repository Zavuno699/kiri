export interface FlowEvent<TPayload = unknown> {
  type: string
  payload: TPayload
  occurredAt: string
}

export async function flowEvent<TPayload>(
  _domain: string,
  _resourceKey: string,
  event: { type: string; payload: TPayload },
): Promise<FlowEvent<TPayload>> {
  return {
    type: event.type,
    payload: event.payload,
    occurredAt: new Date().toISOString(),
  }
}
