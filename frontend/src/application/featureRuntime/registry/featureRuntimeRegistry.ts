import type {
  FeatureRuntimeRegistration,
} from "../contracts/featureRuntimeRegistration";

const registry = new Map<
  string,
  FeatureRuntimeRegistration
>();

export function registerFeatureRuntime(
  registration: FeatureRuntimeRegistration,
): void {
  registry.set(
    registration.domain,
    registration,
  );
}

export function markFeatureRuntimeInitialized(
  domain: string,
): void {
  const current =
    registry.get(domain);

  if (!current) {
    return;
  }

  registry.set(
    domain,
    {
      ...current,
      initialized: true,
    },
  );
}

export function listFeatureRuntimes(): FeatureRuntimeRegistration[] {
  return [...registry.values()];
}
