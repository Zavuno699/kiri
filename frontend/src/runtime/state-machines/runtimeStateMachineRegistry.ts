import type { StateMachineDefinition } from "../../application/state-machines/registry/stateMachineDefinition"
import {
  createStateMachineRegistry,
} from "../../application/state-machines/registry/stateMachineRegistry"

export function createRuntimeStateMachineRegistry() {
  const registry =
    createStateMachineRegistry()

  const definitions: StateMachineDefinition[] = [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ].map((domain) => ({
    id: `${domain}.runtime`,
    domain,
    states: [
      "unknown",
      "loading",
      "active",
      "degraded",
      "blocked",
      "failed",
      "completed",
    ],
    initialState: "unknown",
  }))

  for (const definition of definitions) {
    registry.register(definition)
  }

  return registry
}
