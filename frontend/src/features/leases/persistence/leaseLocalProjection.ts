export interface LeaseLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createLeaseLocalProjection(
  id: string,
): LeaseLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
