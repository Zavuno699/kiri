import type { FeatureRuntime } from "./featureRuntime"

export function createFeatureRuntime(
  id: string,
  domain: string,
  enabled = true,
  readOnly = true,
): FeatureRuntime {
  return {
    id,
    domain,
    enabled,
    readOnly,
    initialized: false,
  }
}
