import type {
  FeatureServiceDescriptor,
} from "../contracts/serviceDescriptor";

const registry = new Map<
  string,
  FeatureServiceDescriptor
>();

export function registerFeatureServiceDescriptor(
  descriptor: FeatureServiceDescriptor,
): void {
  registry.set(
    descriptor.key,
    descriptor,
  );
}

export function listFeatureServiceDescriptors(): FeatureServiceDescriptor[] {
  return [...registry.values()];
}

export function getFeatureServiceDescriptor(
  key: string,
): FeatureServiceDescriptor | null {
  return registry.get(key) ?? null;
}
