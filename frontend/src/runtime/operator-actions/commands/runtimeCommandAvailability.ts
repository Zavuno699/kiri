import {
  runtimeActionDefinitions,
} from "../registry/runtimeActionDefinitions"

export function runtimeCommandAvailability(
  id: string,
) {
  return runtimeActionDefinitions.find(
    (item) => item.id === id,
  )
}
