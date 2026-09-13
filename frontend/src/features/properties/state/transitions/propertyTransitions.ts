import type { PropertyState } from "../propertyState"

export interface PropertyTransition {
  from: PropertyState
  to: PropertyState
  event: string
}

export const propertyTransitions:
  PropertyTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "properties.load",
  },
  {
    from: "loading",
    to: "active",
    event: "properties.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "properties.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "properties.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "properties.failed",
  },
]
