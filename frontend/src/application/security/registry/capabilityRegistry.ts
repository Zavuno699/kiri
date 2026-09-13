import type {
  SecurityCapability,
} from "../contracts/securityCapability";

const capabilities = new Map<
  string,
  SecurityCapability
>();

export function registerCapability(
  capability: SecurityCapability,
): void {
  capabilities.set(
    capability.key,
    capability,
  );
}

export function getCapability(
  key: string,
): SecurityCapability | null {
  return (
    capabilities.get(key) ??
    null
  );
}

export function listCapabilities(): SecurityCapability[] {
  return [
    ...capabilities.values(),
  ];
}
