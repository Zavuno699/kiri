export interface SecurityStatusInput {
  state: string
  error?: boolean
  stale?: boolean
}

export function calculateSecurityStatus(
  input: SecurityStatusInput,
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
