export interface DeviceLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectDeviceLive(
  id: string,
  status: string,
  stale = false,
): DeviceLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
