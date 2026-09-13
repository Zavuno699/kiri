import type { ProjectionDefinition } from "../../application/projections/registry/projectionDefinition"
import {
  createProjectionRegistry,
} from "../../application/projections/registry/projectionRegistry"

export function createRuntimeProjectionRegistry() {
  const registry =
    createProjectionRegistry()

  for (const domain of [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ]) {
    registry.register({
      id: `${domain}.events`,
      domain,
      eventTypes: [
        `${domain}.created`,
        `${domain}.updated`,
        `${domain}.status.changed`,
        `${domain}.failed`,
      ],
      enabled: true,
    })
  }

  return registry
}
