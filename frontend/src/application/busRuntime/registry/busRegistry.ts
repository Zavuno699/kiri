import type {
  BusRegistration,
} from "../contracts/busRegistration";

const registry = new Map<
  string,
  BusRegistration
>();

export function registerBus(
  registration: BusRegistration,
): void {
  registry.set(
    registration.key,
    registration,
  );
}

export function updateBus(
  key: string,
  patch: Partial<BusRegistration>,
): void {
  const current = registry.get(key);

  if (!current) {
    return;
  }

  registry.set(
    key,
    {
      ...current,
      ...patch,
    },
  );
}

export function listBuses(): BusRegistration[] {
  return [...registry.values()];
}

export function getBus(
  key: string,
): BusRegistration | null {
  return registry.get(key) ?? null;
}
