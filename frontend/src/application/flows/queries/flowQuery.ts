export interface FlowQuery<TPayload = unknown> {
  type: string
  payload?: TPayload
}

export async function flowQuery<TPayload = unknown, TResult = unknown>(
  _domain: string,
  _resourceKey: string,
  _payload?: TPayload,
): Promise<TResult> {
  // Mock implementation - in real system this would execute the query
  return undefined as TResult;
}
