export function createPersistenceOperation(
  type:
    | "read"
    | "write"
    | "invalidate"
    | "refresh",
  domain: string,
  resourceKey: string,
) {
  return {
    operationId:
      `${type}:${domain}:${resourceKey}:${Date.now()}`,
    type,
    domain,
    resourceKey,
    startedAt:
      new Date().toISOString(),
    completedAt: null,
    success: false,
    error: null,
  } as const;
}
