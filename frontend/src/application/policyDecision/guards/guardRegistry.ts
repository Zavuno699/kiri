import type {
  StateGuard,
} from "../contracts/stateGuard";

import {
  createActiveLeaseGuard,
  createDeviceOperationalGuard,
  createLockControllableGuard,
  createSecurityClearGuard,
  createPaymentConsistentGuard,
} from "./guardFactories";

const guards = new Map<
  string,
  StateGuard
>();

export function registerGuard(
  guard: StateGuard,
): void {
  guards.set(
    guard.id,
    guard,
  );
}

export function getGuard(
  id: string,
): StateGuard | null {
  return (
    guards.get(id) ??
    null
  );
}

export function listGuards(): StateGuard[] {
  return [
    ...guards.values(),
  ];
}

export function registerCanonicalGuards(): void {
  const canonical = [
    createActiveLeaseGuard(),
    createDeviceOperationalGuard(),
    createLockControllableGuard(),
    createSecurityClearGuard(),
    createPaymentConsistentGuard(),
  ];

  for (
    const guard of
      canonical
  ) {
    registerGuard(
      guard,
    );
  }
}
