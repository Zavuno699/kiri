import type {
  StateGuardDefinition,
} from "../contracts/stateGuard";

import {
  createAuthenticationGuard,
  createLeaseContextGuard,
  createDeviceOperationalGuard,
  createLockControllableGuard,
  createSecurityClearGuard,
  createPaymentConsistentGuard,
} from "./guardFactories";

const guards = new Map<
  string,
  StateGuardDefinition
>();

export function registerGuard(
  guard: StateGuardDefinition,
): void {
  guards.set(
    guard.id,
    guard,
  );
}

export function getGuard(
  id: string,
): StateGuardDefinition | null {
  return (
    guards.get(id) ??
    null
  );
}

export function listGuards(): StateGuardDefinition[] {
  return [
    ...guards.values(),
  ];
}

export function listGuardsByDomain(
  domain: string,
): StateGuardDefinition[] {
  return listGuards().filter(
    (guard) =>
      guard.domain ===
        domain ||
      guard.domain ===
        "global",
  );
}

export function registerCanonicalGuards(): void {
  const guardsToRegister = [
    createAuthenticationGuard(),
    createLeaseContextGuard(),
    createDeviceOperationalGuard(),
    createLockControllableGuard(),
    createSecurityClearGuard(),
    createPaymentConsistentGuard(),
  ];

  for (
    const guard of
      guardsToRegister
  ) {
    registerGuard(
      guard,
    );
  }
}
