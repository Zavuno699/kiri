export interface DeviceStatusInput {
  state: string
  error?: boolean
  stale?: boolean
}

export function calculateDeviceStatus(
  input: DeviceStatusInput,
): "healthy" | "degraded" | "failed" {
  if (input.error || input.state === "failed") {
    return "failed"
  }

  if (
    input.stale ||
    input.state === "degraded" ||
    input.state === "blocked"
  ) {
    return "degraded"
  }

  return "healthy"
}
