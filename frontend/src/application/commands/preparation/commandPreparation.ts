export interface CommandPreparation<T = unknown> {
  commandId: string
  domain: string
  type: string
  payload: T
  preparedAt: string
  correlationId: string
}

export function prepareCommand<T>(
  domain: string,
  type: string,
  payload: T,
): CommandPreparation<T> {
  return {
    commandId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    type,
    payload,
    preparedAt: new Date().toISOString(),
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
  }
}
