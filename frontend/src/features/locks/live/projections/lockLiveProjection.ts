export interface LockLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectLockLive(
  id: string,
  status: string,
  stale = false,
): LockLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
