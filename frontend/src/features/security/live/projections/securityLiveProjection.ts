export interface SecurityLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectSecurityLive(
  id: string,
  status: string,
  stale = false,
): SecurityLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
