export interface LockLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function lockLiveStatus(
  degraded = false,
): LockLiveStatus {
  return {
    status:
      !false
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
