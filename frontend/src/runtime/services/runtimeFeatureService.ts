import {
  createRuntimeFeatureRegistry,
} from "../registries/runtimeFeatureRegistry"

export function getRuntimeFeature(
  id: string,
) {
  return createRuntimeFeatureRegistry().get(id)
}

export function listRuntimeFeatures() {
  return [...createRuntimeFeatureRegistry().values()]
}
