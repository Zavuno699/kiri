import type { SecurityState } from "../securityState"

export interface SecurityTransition {
  from: SecurityState
  to: SecurityState
  event: string
}

export const securityTransitions:
  SecurityTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "security.load",
  },
  {
    from: "loading",
    to: "active",
    event: "security.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "security.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "security.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "security.failed",
  },
]
