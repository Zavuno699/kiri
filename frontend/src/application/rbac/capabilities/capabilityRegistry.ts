import type { RBACCapability } from "./capabilityDefinition";
import { RBAC_CAPABILITY_CATALOG } from "./capabilityCatalog";

const registry = new Map<string, RBACCapability>(
  RBAC_CAPABILITY_CATALOG.map((item) => [item.key, item]),
);

export function getRBACCapability(
  key: string,
): RBACCapability | null {
  return registry.get(key) ?? null;
}

export function listRBACCapabilities(): RBACCapability[] {
  return [...registry.values()];
}
