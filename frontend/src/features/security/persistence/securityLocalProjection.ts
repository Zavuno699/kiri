export interface SecurityLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createSecurityLocalProjection(
  id: string,
): SecurityLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
