import type {
  ProviderRegistration,
} from "../contracts/providerRegistration";

const registry = new Map<
  string,
  ProviderRegistration
>();

export function registerProvider(
  registration: ProviderRegistration,
): void {
  registry.set(
    registration.key,
    registration,
  );
}

export function markProviderInitialized(
  key: string,
): void {
  const current = registry.get(key);

  if (!current) {
    return;
  }

  registry.set(
    key,
    {
      ...current,
      initialized: true,
    },
  );
}

export function listProviders(): ProviderRegistration[] {
  return [...registry.values()];
}

export function getProvider(
  key: string,
): ProviderRegistration | null {
  return registry.get(key) ?? null;
}
