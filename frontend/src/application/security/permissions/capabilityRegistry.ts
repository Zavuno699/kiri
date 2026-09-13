
import type { Capability } from "./capability";

const registry = new Map<string, Capability>();

export function registerCapability(capability: Capability): void {
  registry.set(capability.key, capability);
}

export function getCapability(key: string): Capability | null {
  return registry.get(key) ?? null;
}

export function listCapabilities(): Capability[] {
  return [...registry.values()];
}

