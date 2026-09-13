export interface CrossDomainSnapshot {
  property?: unknown
  lease?: unknown
  payment?: unknown
  device?: unknown
  lock?: unknown
  security?: unknown
  generatedAt: string
  correlationId?: string
}

export function emptyCrossDomainSnapshot(): CrossDomainSnapshot {
  return {
    generatedAt: new Date().toISOString(),
  }
}
