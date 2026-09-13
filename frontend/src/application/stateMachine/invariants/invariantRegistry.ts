import type {
  StateInvariantDefinition,
} from "../contracts/stateInvariant";

import {
  createActiveLeaseInvariant,
  createDeviceOnlineInvariant,
  createLockSecurityInvariant,
  createPaymentIntegrityInvariant,
  createPropertyLifecycleInvariant,
  createSecurityInvariant,
} from "./invariantFactories";

const invariants = new Map<
  string,
  StateInvariantDefinition
>();

export function registerInvariant(
  invariant: StateInvariantDefinition,
): void {
  invariants.set(
    invariant.id,
    invariant,
  );
}

export function getInvariant(
  id: string,
): StateInvariantDefinition | null {
  return (
    invariants.get(
      id,
    ) ??
    null
  );
}

export function listInvariants(): StateInvariantDefinition[] {
  return [
    ...invariants.values(),
  ];
}

export function listInvariantsByDomain(
  domain: string,
): StateInvariantDefinition[] {
  return listInvariants().filter(
    (invariant) =>
      invariant.domain ===
        domain ||
      invariant.domain ===
        "global",
  );
}

export function registerCanonicalInvariants(): void {
  const canonical = [
    createActiveLeaseInvariant(),
    createDeviceOnlineInvariant(),
    createLockSecurityInvariant(),
    createPaymentIntegrityInvariant(),
    createPropertyLifecycleInvariant(),
    createSecurityInvariant(),
  ];

  for (
    const invariant of
      canonical
  ) {
    registerInvariant(
      invariant,
    );
  }
}
