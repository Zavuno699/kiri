export interface FlowQuery<TPayload = unknown> {
  type: string
  payload?: TPayload
}

export function flowQuery<TPayload = unknown>(
  type: string,
  payload?: TPayload,
): FlowQuery<TPayload> {
  return { type, payload }
}
