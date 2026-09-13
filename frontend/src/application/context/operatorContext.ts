export interface OperatorContext {
  operatorId?: string
  sessionId?: string
  tenantId?: string
  correlationId: string
  environment: string
  readOnly: boolean
}

export function createOperatorContext(
  environment: string,
): OperatorContext {
  return {
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    environment,
    readOnly: true,
  }
}
