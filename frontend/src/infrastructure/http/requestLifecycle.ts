export interface RequestLifecycleContext {
  requestId: string
  startedAt: number
  endpoint: string
  method: string
}

export function createRequestLifecycleContext(
  endpoint: string,
  method = "GET",
): RequestLifecycleContext {
  return {
    requestId: crypto.randomUUID(),
    startedAt: Date.now(),
    endpoint,
    method,
  }
}

export function requestDuration(
  context: RequestLifecycleContext,
): number {
  return Date.now() - context.startedAt
}
