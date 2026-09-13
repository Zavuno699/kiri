import type { SecurityState } from "../securityState"

export function reduceSecurityState(
  state: SecurityState,
  event: string,
): SecurityState {
  switch (event) {
    case "security.load":
      return "loading"

    case "security.loaded":
      return "active"

    case "security.degraded":
      return "degraded"

    case "security.recovered":
      return "active"

    case "security.failed":
      return "failed"

    default:
      return state
  }
}
