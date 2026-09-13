import type { PropertyState } from "../propertyState"

export function reducePropertyState(
  state: PropertyState,
  event: string,
): PropertyState {
  switch (event) {
    case "properties.load":
      return "loading"

    case "properties.loaded":
      return "active"

    case "properties.degraded":
      return "degraded"

    case "properties.recovered":
      return "active"

    case "properties.failed":
      return "failed"

    default:
      return state
  }
}
