export interface LeaseLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function leaseLiveStatus(
  degraded = false,
): LeaseLiveStatus {
  return {
    status:
      !true
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
