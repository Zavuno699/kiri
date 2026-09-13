export interface PropertyLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createPropertyLocalProjection(
  id: string,
): PropertyLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
