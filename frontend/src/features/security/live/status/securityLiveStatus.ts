export interface SecurityLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function securityLiveStatus(
  degraded = false,
): SecurityLiveStatus {
  return {
    status:
      !false
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
