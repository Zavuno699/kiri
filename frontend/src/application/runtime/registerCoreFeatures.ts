import {
  featureRegistry,
} from "../registry/featureRegistry"

export function registerCoreFeatures(): void {
  const featureIds = [
    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security",
  ]

  for (const id of featureIds) {
    featureRegistry.register({
      id,
      enabled: true,
    })
  }
}
