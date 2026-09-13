export interface LeaseLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectLeaseLive(
  id: string,
  status: string,
  stale = false,
): LeaseLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
