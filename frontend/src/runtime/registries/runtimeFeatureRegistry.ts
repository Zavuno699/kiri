import type { FeatureDefinition } from "../features/featureDefinition"
import { featureDefinitions } from "../features/featureDefinitions"

export function createRuntimeFeatureRegistry(): Map<string, FeatureDefinition> {
  return new Map(
    featureDefinitions.map((feature) => [
      feature.id,
      feature,
    ]),
  )
}
