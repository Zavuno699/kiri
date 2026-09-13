export interface PropertyLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function propertyLiveStatus(
  degraded = false,
): PropertyLiveStatus {
  return {
    status:
      !true
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
