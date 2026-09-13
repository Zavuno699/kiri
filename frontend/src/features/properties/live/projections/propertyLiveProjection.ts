export interface PropertyLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectPropertyLive(
  id: string,
  status: string,
  stale = false,
): PropertyLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
