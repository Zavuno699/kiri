import {
  CANONICAL_API_RESOURCES,
} from "./canonicalResourceCatalog";

import type {
  ApiResourceDefinition,
} from "../contracts/apiResource";

const registry = new Map<
  string,
  ApiResourceDefinition
>();

export function initializeApiResourceRegistry(): void {
  for (
    const resource of
      CANONICAL_API_RESOURCES
  ) {
    registry.set(
      resource.key,
      resource,
    );
  }
}

export function registerApiResource(
  resource: ApiResourceDefinition,
): void {
  registry.set(
    resource.key,
    resource,
  );
}

export function getApiResource(
  key: string,
): ApiResourceDefinition | null {
  return (
    registry.get(key) ??
    null
  );
}

export function listApiResources(): ApiResourceDefinition[] {
  return [
    ...registry.values(),
  ];
}
