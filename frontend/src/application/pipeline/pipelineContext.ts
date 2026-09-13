export interface PipelineContext {
  correlationId: string
  domain: string
  operationId: string
  startedAt: string
  metadata: Record<string, unknown>
}

export function createPipelineContext(
  domain: string,
  operationId: string,
): PipelineContext {
  return {
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    operationId,
    startedAt: new Date().toISOString(),
    metadata: {},
  }
}
