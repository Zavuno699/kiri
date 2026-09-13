export interface LockLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createLockLocalProjection(
  id: string,
): LockLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
