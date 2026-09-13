export interface RealizationContext {
  correlationId: string
  operatorId?: string
  domain: string
  subjectId?: string
  readOnly: boolean
}

export function createRealizationContext(
  domain: string,
  subjectId?: string,
): RealizationContext {
  return {
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    subjectId,
    readOnly: true,
  }
}
