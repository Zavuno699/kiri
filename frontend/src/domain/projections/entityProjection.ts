export interface EntityProjection<T> {
  entity: T
  projectedAt: string
  source: "api" | "event" | "cache" | "local"
  version?: number
}

export function projectEntity<T>(
  entity: T,
  source: EntityProjection<T>["source"],
  version?: number,
): EntityProjection<T> {
  return {
    entity,
    projectedAt: new Date().toISOString(),
    source,
    version,
  }
}
