import type {
  ServiceRegistration,
} from "../contracts/serviceRegistration";

const registry = new Map<
  string,
  ServiceRegistration
>();

export function registerService(
  registration: ServiceRegistration,
): void {
  registry.set(
    registration.key,
    registration,
  );
}

export function markServiceInitialized(
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

export function getService(
  key: string,
): ServiceRegistration | null {
  return registry.get(key) ?? null;
}

export function listServices(): ServiceRegistration[] {
  return [...registry.values()];
}
