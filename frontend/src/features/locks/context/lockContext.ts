export interface LockContext {
  domain: "locks"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createLockContext(
  entityId?: string,
): LockContext {
  return {
    domain: "locks",
    entityId,
    readOnly: true,
  }
}
