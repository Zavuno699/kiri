export interface DeviceLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function deviceLiveStatus(
  degraded = false,
): DeviceLiveStatus {
  return {
    status:
      !true
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
